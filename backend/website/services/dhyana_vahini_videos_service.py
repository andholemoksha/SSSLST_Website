"""Querying and YouTube Data API v3 synchronization for Dhyana Vahini videos.

(YouTube deprecated the public RSS feed endpoint, which now returns 404, so the
official YouTube Data API v3 is used instead. Requires YOUTUBE_API_KEY in .env.)
"""

import json
from datetime import date
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.utils import timezone

from website.models import DhyanaVahiniText, DhyanaVahiniVideo


API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'


def get_videos_by_year(year):
    return DhyanaVahiniVideo.objects.filter(year=year, is_active=True)


def get_available_years():
    video_years = DhyanaVahiniVideo.objects.filter(is_active=True).values_list('year', flat=True)
    text_years = DhyanaVahiniText.objects.filter(is_active=True).values_list('year', flat=True)
    return sorted(
        set(video_years).union(text_years),
        reverse=True,
    )


def fetch_playlist_videos(playlist_id):
    """Fetch all videos in a YouTube playlist via the Data API v3.

    Returns a list of dicts: [{'video_id', 'title', 'published_at'}, ...]
    in playlist order. Handles pagination (50 per page).
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

        request = Request(
            f'{API_URL}?{urlencode(params)}',
            headers={'User-Agent': 'SSSLST-DhyanaVahini-Sync/1.0'},
        )

        try:
            with urlopen(request, timeout=15) as response:
                data = json.loads(response.read().decode('utf-8'))
        except HTTPError as exc:
            try:
                body = json.loads(exc.read().decode('utf-8'))
                message = body.get('error', {}).get('message', str(exc))
            except Exception:
                message = str(exc)
            raise RuntimeError(f'YouTube API error for playlist {playlist_id}: {message}')
        except URLError as exc:
            raise RuntimeError(f'Failed to reach YouTube API for playlist {playlist_id}: {exc}')

        for item in data.get('items', []):
            snippet = item.get('snippet', {})
            content = item.get('contentDetails', {})

            video_id = content.get('videoId') or snippet.get('resourceId', {}).get('videoId')
            title = snippet.get('title', '')

            if not video_id:
                continue
            if title in ('Private video', 'Deleted video'):
                continue

            published_at = None
            published_raw = content.get('videoPublishedAt') or snippet.get('publishedAt')
            if published_raw:
                try:
                    published_at = date.fromisoformat(published_raw[:10])
                except ValueError:
                    pass

            videos.append({
                'video_id': video_id.strip(),
                'title': title.strip(),
                'published_at': published_at,
            })

        page_token = data.get('nextPageToken')
        if not page_token:
            break

    return videos


def sync_playlist(playlist):
    """Synchronize a playlist and return added, updated, and deactivated counts."""
    api_videos = fetch_playlist_videos(playlist.playlist_id)
    api_video_ids = {video['video_id'] for video in api_videos}
    added = updated = 0

    # Playlist order: first item in the playlist gets order=1
    for order, video in enumerate(api_videos, start=1):
        existing = DhyanaVahiniVideo.objects.filter(video_id=video['video_id']).first()
        changed = existing and (
            existing.year != playlist.year
            or existing.title != video['title']
            or existing.published_at != video['published_at']
            or existing.order != order
            or not existing.is_active
        )
        _, created = DhyanaVahiniVideo.objects.update_or_create(
            video_id=video['video_id'],
            defaults={
                'year': playlist.year,
                'title': video['title'],
                'published_at': video['published_at'],
                'order': order,
                'source': DhyanaVahiniVideo.Source.PLAYLIST,
                'is_active': True,
            },
        )
        added += int(created)
        updated += int(bool(changed))

    inactive_videos = DhyanaVahiniVideo.objects.filter(
        year=playlist.year,
        source=DhyanaVahiniVideo.Source.PLAYLIST,
        is_active=True,
    ).exclude(video_id__in=api_video_ids)
    deactivated = inactive_videos.count()
    inactive_videos.update(is_active=False)

    playlist.last_synced_at = timezone.now()
    playlist.save(update_fields=['last_synced_at'])
    return added, updated, deactivated
