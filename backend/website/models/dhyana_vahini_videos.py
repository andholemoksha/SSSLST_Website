"""Models for Dhyana Vahini YouTube playlists and their videos."""

from urllib.parse import parse_qs, urlparse

from django.core.exceptions import ValidationError
from django.db import models


class DhyanaVahiniPlaylist(models.Model):
    """One YouTube playlist for a Dhyana Vahini content year."""

    year = models.PositiveIntegerField(unique=True)
    playlist_url = models.URLField(max_length=300)
    playlist_id = models.CharField(max_length=60, unique=True, editable=False)
    is_active = models.BooleanField(default=True)
    last_synced_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year']
        verbose_name = 'Dhyana Vahini Playlist'
        verbose_name_plural = 'Dhyana Vahini Playlists'

    def __str__(self):
        return f'{self.year} — {self.playlist_id}'

    def save(self, *args, **kwargs):
        playlist_id = parse_qs(urlparse(self.playlist_url).query).get('list', [None])[0]
        if not playlist_id:
            raise ValidationError({'playlist_url': 'Enter a YouTube playlist URL containing a list parameter.'})
        self.playlist_id = playlist_id
        super().save(*args, **kwargs)


class DhyanaVahiniVideo(models.Model):
    """A video discovered from a Dhyana Vahini YouTube playlist."""

    class Source(models.TextChoices):
        PLAYLIST = 'playlist', 'YouTube playlist'
        MANUAL = 'manual', 'Manual video link'

    year = models.PositiveIntegerField(db_index=True)
    video_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=255)
    published_at = models.DateField(null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    source = models.CharField(max_length=10, choices=Source.choices, default=Source.PLAYLIST)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['year', 'order', 'id']
        verbose_name = 'Dhyana Vahini Video'
        verbose_name_plural = 'Dhyana Vahini Videos'

    def __str__(self):
        return f'[{self.year}] {self.title}'
