"""Models for the Netritvam magazine (HeyZine flip-book) publications."""

from django.db import models


class Netritvam(models.Model):
    """A single Netritvam issue backed by a HeyZine flip-book link."""

    serial_number = models.PositiveIntegerField(
        unique=True,
        db_index=True,
        help_text='Issue number, e.g. 1 for Netritvam-1. Higher numbers are newer.',
    )
    title = models.CharField(
        max_length=255,
        blank=True,
        help_text='Optional custom title. Defaults to "Netritvam-<serial number>" if left blank.',
    )
    flipbook_url = models.URLField(
        max_length=500,
        unique=True,
        help_text='HeyZine flip-book link opened when a reader clicks "Read issue".',
    )
    cover_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='Optional cover image URL shown on the card.',
    )
    cover_image = models.ImageField(
        upload_to='netritvam/covers/',
        blank=True,
        null=True,
        help_text='Optional cover image upload. Takes precedence over the cover image URL.',
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Highest issue number first (newest issue leads).
        ordering = ['-serial_number', 'id']
        verbose_name = 'Netritvam'
        verbose_name_plural = 'Netritvam'

    def __str__(self):
        return self.display_title

    @property
    def display_title(self):
        if self.title:
            return self.title
        return f'Netritvam-{self.serial_number}'

    @property
    def cover_image_source(self):
        """Return the effective cover image (upload wins over URL), or '' if none."""
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or ''
