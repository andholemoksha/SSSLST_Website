"""Models for the Sathvam video data.

Stores YouTube playlist references and individual video entries grouped by year
for the Satsangatve Nissangatvam satsang series.
"""

from django.db import models


class SathvamPlaylist(models.Model):
    """Stores the YouTube playlist for each year.

    The admin pastes the full YouTube playlist URL. The model auto-extracts
    the playlist ID on save. The sync command uses it to fetch videos.
    """
    year = models.PositiveIntegerField(unique=True, help_text='Year this playlist belongs to')
    playlist_url = models.URLField(
        max_length=300,
        default='',
        help_text='Full YouTube playlist URL (e.g. https://youtube.com/playlist?list=PLxxx...)',
    )
    playlist_id = models.CharField(max_length=60, unique=True, editable=False, help_text='Auto-extracted playlist ID')
    is_active = models.BooleanField(default=True, help_text='Whether to include this playlist during sync')
    last_synced_at = models.DateTimeField(null=True, blank=True, help_text='Last time this playlist was synced')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year']
        verbose_name = 'Sathvam Playlist'
        verbose_name_plural = 'Sathvam Playlists'

    def __str__(self):
        return f'{self.year} — {self.playlist_id}'

    def save(self, *args, **kwargs):
        """Extract playlist_id from the URL before saving."""
        self.playlist_id = self._extract_playlist_id(self.playlist_url)
        super().save(*args, **kwargs)

    @staticmethod
    def _extract_playlist_id(url):
        """Extract the playlist ID from a YouTube URL.

        Handles:
          https://youtube.com/playlist?list=PLxxx&si=abc
          https://www.youtube.com/playlist?list=PLxxx
        """
        from urllib.parse import urlparse, parse_qs
        parsed = urlparse(url)
        params = parse_qs(parsed.query)
        playlist_id = params.get('list', [None])[0]
        if not playlist_id:
            raise ValueError(f'Could not extract playlist ID from URL: {url}')
        return playlist_id


class SathvamVideo(models.Model):
    year = models.PositiveIntegerField(db_index=True, help_text='Year the video belongs to (e.g. 2025, 2026)')
    video_id = models.CharField(max_length=20, unique=True, help_text='YouTube video ID')
    title = models.CharField(max_length=255, help_text='Video title / speaker name')
    published_at = models.DateField(null=True, blank=True, help_text='Date the video was published on YouTube')
    order = models.PositiveSmallIntegerField(default=0, help_text='Display order within the year (lower = first)')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['year', 'order', 'id']
        verbose_name = 'Sathvam Video'
        verbose_name_plural = 'Sathvam Videos'

    def __str__(self):
        return f'[{self.year}] {self.title}'
