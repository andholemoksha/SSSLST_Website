"""Database model for the Netritvam publication."""

from django.db import models


class Netritvam(models.Model):
    """A single Netritvam issue backed by an external flip-book (HeyZine) link.

    Organised like the Newsletter feature: grouped by year, ordered by serial
    number within a year. The most recent issue (newest year, then highest
    serial number) is surfaced automatically as the "latest" — there is no
    admin-managed featured flag.
    """

    serial_number = models.PositiveSmallIntegerField(
        help_text='Serial number within its year (e.g. 1, 2, 3 ...).',
    )
    year = models.PositiveIntegerField(
        db_index=True,
        help_text='Year this issue belongs to.',
    )
    title = models.CharField(
        max_length=255,
        blank=True,
        help_text='Optional custom title. Defaults to "Netritvam-<serial_number>" if left blank.',
    )
    publication_url = models.URLField(
        max_length=500,
        unique=True,
        help_text='HeyZine flip-book link opened when a reader clicks "Read publication".',
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
        # Newest year first, but issues within a year run 1 -> N.
        ordering = ['-year', 'serial_number', 'id']
        verbose_name = 'Netritvam'
        verbose_name_plural = 'Netritvam'
        constraints = [
            models.UniqueConstraint(
                fields=['year', 'serial_number'],
                name='unique_netritvam_year_serial',
            ),
        ]

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
