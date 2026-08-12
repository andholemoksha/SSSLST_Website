"""Management command to sync Sathvam videos from YouTube RSS feeds.

For each active SathvamPlaylist, fetches the YouTube RSS feed and:
- Adds any new videos found in the feed
- Deactivates videos that are no longer in the feed (deleted from playlist)
- Reactivates videos that reappear in the feed
- Updates titles if they changed on YouTube

No YouTube API key required — uses the free public RSS feed.
"""

import xml.etree.ElementTree as ET
from datetime import date
from urllib.request import urlopen, Request
from urllib.error import URLError

from django.core.management.base import BaseCommand
from django.utils import timezone

from website.models import SathvamPlaylist, SathvamVideo

RSS_URL_TEMPLATE = 'https://www.youtube.com/feeds/videos.xml?playlist_id={playlist_id}'

# XML namespaces used in YouTube RSS feeds
NS = {
    'atom': 'http://www.w3.org/2005/Atom',
    'yt': 'http://www.youtube.com/xml/schemas/2015',
    'media': 'http://search.yahoo.com/mrss/',
}


def fetch_playlist_videos(playlist_id):
    """Fetch video entries from a YouTube playlist RSS feed.

    Returns a list of dicts: [{'video_id': str, 'title': str, 'published_at': date}, ...]
    Ordered as they appear in the feed (newest first typically).
    """
    url = RSS_URL_TEMPLATE.format(playlist_id=playlist_id)
    req = Request(url, headers={'User-Agent': 'SSSLST-Sync/1.0'})

    try:
        with urlopen(req, timeout=15) as response:
            xml_data = response.read()
    except URLError as e:
        raise RuntimeError(f'Failed to fetch RSS for playlist {playlist_id}: {e}')

    root = ET.fromstring(xml_data)
    entries = root.findall('atom:entry', NS)

    videos = []
    for entry in entries:
        video_id = entry.find('yt:videoId', NS)
        title = entry.find('atom:title', NS)
        published = entry.find('atom:published', NS)

        if video_id is None or title is None:
            continue

        published_date = None
        if published is not None and published.text:
            try:
                published_date = date.fromisoformat(published.text[:10])
            except ValueError:
                pass

        videos.append({
            'video_id': video_id.text.strip(),
            'title': title.text.strip() if title.text else '',
            'published_at': published_date,
        })

    return videos


def sync_playlist(playlist, stdout=None):
    """Sync a single playlist. Returns (added, updated, deactivated) counts."""
    added = 0
    updated = 0
    deactivated = 0

    # Fetch current videos from YouTube RSS
    rss_videos = fetch_playlist_videos(playlist.playlist_id)
    rss_video_ids = {v['video_id'] for v in rss_videos}

    # Process videos from RSS — add new, update existing, reactivate returned
    for order, video_data in enumerate(reversed(rss_videos), start=1):
        # reversed() so oldest video gets order=1 (chronological)
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

    # Deactivate videos that are no longer in the RSS feed (removed from playlist)
    removed_qs = SathvamVideo.objects.filter(
        year=playlist.year,
        is_active=True,
    ).exclude(video_id__in=rss_video_ids)

    deactivated = removed_qs.count()
    removed_qs.update(is_active=False)

    # Update last_synced_at
    playlist.last_synced_at = timezone.now()
    playlist.save(update_fields=['last_synced_at'])

    return added, updated, deactivated


class Command(BaseCommand):
    help = 'Sync Sathvam videos from YouTube RSS feeds for all active playlists'

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
                self.stdout.write(f'  → +{added} new, ~{updated} updated, -{deactivated} deactivated')
            except RuntimeError as e:
                self.stdout.write(self.style.ERROR(f'  → Error: {e}'))

        self.stdout.write(self.style.SUCCESS(
            f'\nDone. +{total_added} added, ~{total_updated} updated, -{total_deactivated} deactivated.'
        ))
