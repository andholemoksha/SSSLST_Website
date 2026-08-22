"""Querying and YouTube RSS synchronization for Dhyana Vahini videos."""

import xml.etree.ElementTree as ET
from datetime import date
from urllib.error import URLError
from urllib.request import Request, urlopen

from django.utils import timezone

from website.models import DhyanaVahiniVideo


RSS_URL_TEMPLATE = 'https://www.youtube.com/feeds/videos.xml?playlist_id={playlist_id}'
NAMESPACES = {
    'atom': 'http://www.w3.org/2005/Atom',
    'yt': 'http://www.youtube.com/xml/schemas/2015',
}


def get_videos_by_year(year):
    return DhyanaVahiniVideo.objects.filter(year=year, is_active=True)


def get_available_years():
    return (
        DhyanaVahiniVideo.objects.filter(is_active=True)
        .values_list('year', flat=True)
        .distinct()
        .order_by('-year')
    )


def fetch_playlist_videos(playlist_id):
    """Return playlist entries in the order provided by YouTube's RSS feed."""
    request = Request(
        RSS_URL_TEMPLATE.format(playlist_id=playlist_id),
        headers={'User-Agent': 'SSSLST-DhyanaVahini-Sync/1.0'},
    )
    try:
        with urlopen(request, timeout=15) as response:
            root = ET.fromstring(response.read())
    except (URLError, OSError, ET.ParseError) as exc:
        raise RuntimeError(f'Unable to fetch the YouTube playlist: {exc}') from exc

    videos = []
    for entry in root.findall('atom:entry', NAMESPACES):
        video_id = entry.find('yt:videoId', NAMESPACES)
        title = entry.find('atom:title', NAMESPACES)
        published = entry.find('atom:published', NAMESPACES)
        if video_id is None or not video_id.text or title is None:
            continue
        try:
            published_at = date.fromisoformat(published.text[:10]) if published is not None and published.text else None
        except ValueError:
            published_at = None
        videos.append({
            'video_id': video_id.text.strip(),
            'title': title.text.strip() if title.text else '',
            'published_at': published_at,
        })
    return videos


def sync_playlist(playlist):
    """Synchronize a playlist and return added, updated, and deactivated counts."""
    rss_videos = fetch_playlist_videos(playlist.playlist_id)
    rss_video_ids = {video['video_id'] for video in rss_videos}
    added = updated = 0

    for order, video in enumerate(reversed(rss_videos), start=1):
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
    ).exclude(video_id__in=rss_video_ids)
    deactivated = inactive_videos.count()
    inactive_videos.update(is_active=False)

    playlist.last_synced_at = timezone.now()
    playlist.save(update_fields=['last_synced_at'])
    return added, updated, deactivated
