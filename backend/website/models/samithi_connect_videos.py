"""Model for Samithi Connect YouTube video reflections.

Admin-managed individual videos (a YouTube video id per row), mirroring the
Dhyana Vahini video card pattern — no playlist sync.
"""

from django.db import models


class SamithiConnectVideo(models.Model):
    """A single Samithi Connect video reflection (a YouTube video id)."""

    year = models.PositiveIntegerField(db_index=True)
    video_id = models.CharField(
        max_length=20,
        unique=True,
        help_text='YouTube video id, e.g. 6V7zg9Scggc (from the video/shorts URL).',
    )
    title = models.CharField(max_length=255)
    published_at = models.DateField(null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['year', 'order', 'id']
        verbose_name = 'Samithi Connect Video'
        verbose_name_plural = 'Samithi Connect Videos'

    def __str__(self):
        return f'[{self.year}] {self.title}'
