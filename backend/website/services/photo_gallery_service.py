"""Querying + Google Drive synchronization for the Photo Gallery.

Sync (admin action) is the ONLY place that talks to Google Drive. It lists a
folder's images via the Drive API v3 and stores each photo's id + image links in
our database. All user-facing reads come from the database, so normal page loads
never call Google Drive (fast, cache-friendly, safe for many simultaneous users
and Drive rate limits).
"""

import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.utils import timezone

from website.models import GalleryAlbum, GalleryPhoto
from website.models.photo_gallery import extract_drive_folder_id

DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files'


# ─────────────────────────── Query services (read path) ───────────────────────────

def get_active_years():
    """Distinct years (newest first) that have at least one active card with photos."""
    return (
        GalleryAlbum.objects.filter(is_active=True, photos__is_active=True)
        .values_list('year', flat=True)
        .distinct()
        .order_by('-year')
    )


def get_albums_for_year(year):
    """Active cards for a given year that contain at least one active photo."""
    return (
        GalleryAlbum.objects.filter(
            year=year,
            is_active=True,
            photos__is_active=True,
        )
        .distinct()
        .order_by('order', 'id')
    )


def get_album_counts_for_year(year):
    """(album_count, photo_count) for a year, counting only active cards with photos."""
    albums = get_albums_for_year(year)
    album_count = albums.count()
    photo_count = GalleryPhoto.objects.filter(
        album__year=year, album__is_active=True, is_active=True,
    ).count()
    return album_count, photo_count


def get_photos_for_album(album_id):
    """Active photos for an album id, in order."""
    return GalleryPhoto.objects.filter(album_id=album_id, is_active=True).order_by('order', 'id')


# ─────────────────────────── Google Drive image links ───────────────────────────

def thumbnail_url(file_id, size=400):
    """Small CDN thumbnail for the grid (resizable, no API auth needed for public files)."""
    return f'https://drive.google.com/thumbnail?id={file_id}&sz=w{size}'


def full_url(file_id, size=1600):
    """Larger image for the lightbox."""
    return f'https://drive.google.com/thumbnail?id={file_id}&sz=w{size}'


# ─────────────────────────── Drive listing (sync path) ───────────────────────────

def list_drive_images(folder_id):
    """List image files in a Drive folder via the Drive API v3 (paginated).

    Returns a list of dicts: [{'id', 'name', 'width', 'height'}, ...].
    Raises RuntimeError on configuration or API errors.
    """
    api_key = getattr(settings, 'GOOGLE_API_KEY', '') or ''
    if not api_key:
        raise RuntimeError(
            'GOOGLE_API_KEY is not set. Add it to the backend .env file '
            '(Google Cloud Console -> enable "Google Drive API" -> create an API key).'
        )

    files = []
    page_token = None

    while True:
        params = {
            'q': f"'{folder_id}' in parents and mimeType contains 'image/' and trashed = false",
            'fields': 'nextPageToken, files(id, name, imageMediaMetadata(width, height))',
            'pageSize': 100,
            'key': api_key,
            'supportsAllDrives': 'true',
            'includeItemsFromAllDrives': 'true',
            'orderBy': 'name_natural',
        }
        if page_token:
            params['pageToken'] = page_token

        request = Request(
            f'{DRIVE_API_URL}?{urlencode(params)}',
            headers={'User-Agent': 'SSSLST-Gallery-Sync/1.0'},
        )

        try:
            with urlopen(request, timeout=20) as response:
                data = json.loads(response.read().decode('utf-8'))
        except HTTPError as exc:
            try:
                body = json.loads(exc.read().decode('utf-8'))
                message = body.get('error', {}).get('message', str(exc))
            except Exception:
                message = str(exc)
            raise RuntimeError(f'Google Drive API error for folder {folder_id}: {message}')
        except URLError as exc:
            raise RuntimeError(f'Failed to reach Google Drive API for folder {folder_id}: {exc}')

        for item in data.get('files', []):
            metadata = item.get('imageMediaMetadata', {}) or {}
            files.append({
                'id': item['id'],
                'name': item.get('name', ''),
                'width': metadata.get('width'),
                'height': metadata.get('height'),
            })

        page_token = data.get('nextPageToken')
        if not page_token:
            break

    return files


def sync_album(album):
    """Sync a single album's photos from its Drive folder.

    Returns (added, updated, deactivated). Idempotent: re-running never
    duplicates rows. Photos removed from the Drive folder are deactivated.
    """
    folder_id = album.drive_folder_id or extract_drive_folder_id(album.drive_folder_url)
    if not folder_id:
        raise RuntimeError('This album has no valid Google Drive folder link.')

    drive_files = list_drive_images(folder_id)
    drive_ids = {f['id'] for f in drive_files}
    added = updated = 0

    for order, item in enumerate(drive_files, start=1):
        file_id = item['id']
        existing = GalleryPhoto.objects.filter(album=album, drive_file_id=file_id).first()
        defaults = {
            'title': item['name'],
            'thumbnail_link': thumbnail_url(file_id),
            'full_link': full_url(file_id),
            'width': item['width'],
            'height': item['height'],
            'order': order,
            'is_active': True,
        }
        changed = existing and (
            existing.title != defaults['title']
            or existing.order != order
            or not existing.is_active
        )
        _, created = GalleryPhoto.objects.update_or_create(
            album=album,
            drive_file_id=file_id,
            defaults=defaults,
        )
        added += int(created)
        updated += int(bool(changed))

    stale = GalleryPhoto.objects.filter(album=album, is_active=True).exclude(drive_file_id__in=drive_ids)
    deactivated = stale.count()
    stale.update(is_active=False)

    album.photo_count = GalleryPhoto.objects.filter(album=album, is_active=True).count()
    album.last_synced_at = timezone.now()
    album.save(update_fields=['photo_count', 'last_synced_at'])

    return added, updated, deactivated
