"""Management command to sync Sathvam videos from the YouTube Data API v3.

For each active SathvamPlaylist, fetches the playlist's videos via the
YouTube Data API and:
- Adds any new videos found
- Deactivates videos that are no longer in the playlist (removed on YouTube)
- Reactivates videos that reappear in the playlist
- Updates titles if they changed on YouTube

Requires a free YouTube Data API v3 key set as YOUTUBE_API_KEY in the backend
.env file. (The previously used public RSS feed endpoint was deprecated by
YouTube and now returns 404, so the official API is used instead.)
"""

import json
from datetime import date
from urllib.parse import urlencode
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError

from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from website.models import SathvamPlaylist, SathvamVideo

API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'


def fetch_playlist_videos(playlist_id):
    """Fetch all videos in a YouTube playlist via the Data API v3.

    Returns a list of dicts: [{'video_id': str, 'title': str, 'published_at': date}, ...]
    ordered as they appear in the playlist. Handles pagination (50 per page).
    """
    api_key = getattr(settings, 'YOUTUBE_API_KEY', '') or ''
    if not api_key:
        raise RuntimeError(
            'YOUTUBE_API_KEY is not set. Add it to the backend .env file '
            '(get a free key from Google Cloud Console -> YouTube Data API v3).'
        )

    videos = []
    page_token = None

    while True:
        params = {
            'part': 'snippet,contentDetails',
            'playlistId': playlist_id,
            'maxResults': 50,
            'key': api_key,
        }
        if page_token:
            params['pageToken'] = page_token

        url = f'{API_URL}?{urlencode(params)}'
        req = Request(url, headers={'User-Agent': 'SSSLST-Sync/1.0'})

        try:
            with urlopen(req, timeout=15) as response:
                data = json.loads(response.read().decode('utf-8'))
        except HTTPError as e:
            # Surface the API's error message (e.g. quota, bad key, playlist not found)
            try:
                body = json.loads(e.read().decode('utf-8'))
                message = body.get('error', {}).get('message', str(e))
            except Exception:
                message = str(e)
            raise RuntimeError(f'YouTube API error for playlist {playlist_id}: {message}')
        except URLError as e:
            raise RuntimeError(f'Failed to reach YouTube API for playlist {playlist_id}: {e}')

        for item in data.get('items', []):
            snippet = item.get('snippet', {})
            content = item.get('contentDetails', {})

            video_id = content.get('videoId') or snippet.get('resourceId', {}).get('videoId')
            title = snippet.get('title', '')

            if not video_id:
                continue

            # Skip private/deleted videos (YouTube marks them with these titles)
            if title in ('Private video', 'Deleted video'):
                continue

            published_date = None
            published_raw = content.get('videoPublishedAt') or snippet.get('publishedAt')
            if published_raw:
                try:
                    published_date = date.fromisoformat(published_raw[:10])
                except ValueError:
                    pass

            videos.append({
                'video_id': video_id.strip(),
                'title': title.strip(),
                'published_at': published_date,
            })

        page_token = data.get('nextPageToken')
        if not page_token:
            break

    return videos


def sync_playlist(playlist, stdout=None):
    """Sync a single playlist. Returns (added, updated, deactivated) counts."""
    added = 0
    updated = 0

    api_videos = fetch_playlist_videos(playlist.playlist_id)
    api_video_ids = {v['video_id'] for v in api_videos}

    # Add new, update existing, reactivate returned. Order by playlist position
    # so the first item in the playlist gets order=1.
    for order, video_data in enumerate(api_videos, start=1):
        obj, created = SathvamVideo.objects.update_or_create(
            video_id=video_data['video_id'],
            defaults={
                'year': playlist.year,
                'title': video_data['title'],
                'published_at': video_data['published_at'],
                'order': order,
                'is_active': True,
            },
        )
        if created:
            added += 1
        elif obj.title != video_data['title'] or not obj.is_active:
            updated += 1

    # Deactivate videos no longer in the playlist (removed on YouTube)
    removed_qs = SathvamVideo.objects.filter(
        year=playlist.year,
        is_active=True,
    ).exclude(video_id__in=api_video_ids)

    deactivated = removed_qs.count()
    removed_qs.update(is_active=False)

    playlist.last_synced_at = timezone.now()
    playlist.save(update_fields=['last_synced_at'])

    return added, updated, deactivated


class Command(BaseCommand):
    help = 'Sync Sathvam videos from the YouTube Data API v3 for all active playlists'

    def add_arguments(self, parser):
        parser.add_argument(
            '--year',
            type=int,
            help='Sync only a specific year (optional)',
        )

    def handle(self, *args, **options):
        playlists = SathvamPlaylist.objects.filter(is_active=True)

        if options['year']:
            playlists = playlists.filter(year=options['year'])

        if not playlists.exists():
            self.stdout.write(self.style.WARNING('No active playlists found. Add playlists in Django admin first.'))
            return

        total_added = 0
        total_updated = 0
        total_deactivated = 0

        for playlist in playlists:
            self.stdout.write(f'Syncing {playlist.year} (playlist: {playlist.playlist_id})...')
            try:
                added, updated, deactivated = sync_playlist(playlist, self.stdout)
                total_added += added
                total_updated += updated
                total_deactivated += deactivated
                self.stdout.write(f'  -> +{added} new, ~{updated} updated, -{deactivated} deactivated')
            except RuntimeError as e:
                self.stdout.write(self.style.ERROR(f'  -> Error: {e}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nDone. +{total_added} added, ~{total_updated} updated, -{total_deactivated} deactivated.'
        ))
