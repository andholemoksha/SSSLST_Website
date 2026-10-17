"""Querying + Google Drive sync for Samithi Connect activity photos.

Reuses the Photo Gallery Drive helpers (list_drive_images + the CDN link
builders). Sync is the only place that talks to Google; user-facing reads come
from the database.
"""

from django.utils import timezone

from website.models import SamithiActivity, SamithiPhoto
from website.models.samithi_photos import extract_drive_folder_id
from website.services.photo_gallery_service import (
    full_url,
    list_drive_images,
    thumbnail_url,
)


# ─────────────────────────── Query services (read path) ───────────────────────────

def get_carousel_images():
    """One representative image per active activity, tagged by wing.

    Returns a list of dicts ``{'wing', 'title', 'image'}`` — **every** active
    photo of every active activity that has photos, grouped in the canonical
    wing order Spiritual -> Service -> Education (and by activity order, then
    photo order within each). This backs the public Samithi Connect carousel,
    so selecting a wing shows all of that wing's photos.
    """
    wing_order = [
        SamithiActivity.Wing.SPIRITUAL,
        SamithiActivity.Wing.SERVICE,
        SamithiActivity.Wing.EDUCATION,
    ]
    items = []
    for wing in wing_order:
        activities = (
            SamithiActivity.objects.filter(
                wing=wing,
                is_active=True,
                photos__is_active=True,
            )
            .distinct()
            .order_by('order', 'id')
        )
        for activity in activities:
            photos = activity.photos.filter(is_active=True).order_by('order', 'id')
            for photo in photos:
                items.append({
                    'wing': wing,
                    'title': photo.title or activity.title,
                    'image': photo.thumbnail_link,
                })
    return items


# ─────────────────────────── Drive sync ───────────────────────────

def sync_activity(activity):
    """Sync a single activity's photos from its Drive folder.

    Returns (added, updated, deactivated). Idempotent: re-running never
    duplicates rows. Photos removed from the Drive folder are deactivated.
    """
    folder_id = activity.drive_folder_id or extract_drive_folder_id(activity.drive_folder_url)
    if not folder_id:
        raise RuntimeError('This activity has no valid Google Drive folder link.')

    drive_files = list_drive_images(folder_id)
    drive_ids = {f['id'] for f in drive_files}
    added = updated = 0

    for order, item in enumerate(drive_files, start=1):
        file_id = item['id']
        existing = SamithiPhoto.objects.filter(activity=activity, drive_file_id=file_id).first()
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
        _, created = SamithiPhoto.objects.update_or_create(
            activity=activity,
            drive_file_id=file_id,
            defaults=defaults,
        )
        added += int(created)
        updated += int(bool(changed))

    stale = SamithiPhoto.objects.filter(activity=activity, is_active=True).exclude(drive_file_id__in=drive_ids)
    deactivated = stale.count()
    stale.update(is_active=False)

    activity.photo_count = SamithiPhoto.objects.filter(activity=activity, is_active=True).count()
    activity.last_synced_at = timezone.now()
    activity.save(update_fields=['photo_count', 'last_synced_at'])

    return added, updated, deactivated
