"""Models for Samithi Connect YouTube video reflections."""

from django.db import models


class SamithiConnectVideo(models.Model):
    """A manually managed YouTube video reflection for Samithi Connect."""

    video_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=255)
    published_at = models.DateField(null=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Samithi Connect Video'
        verbose_name_plural = 'Samithi Connect Videos'

    def __str__(self):
        return self.title
