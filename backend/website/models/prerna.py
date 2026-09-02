"""Model for Prerna yearbook editions."""

from django.db import models


class PrernaEdition(models.Model):
    """A single year's Prerna yearbook."""

    year = models.PositiveIntegerField(unique=True, help_text='Year this edition belongs to')
    title = models.CharField(max_length=255, help_text='Display title (e.g. Prerana 2026)')
    description = models.CharField(
        max_length=500, blank=True, default='',
        help_text='Optional short description',
    )
    pdf_url = models.URLField(
        max_length=500,
        help_text='Google Drive shareable link for the PDF (or folder link)',
    )
    cover_image = models.ImageField(
        upload_to='prerna/covers/',
        blank=True, null=True,
        help_text='Upload a cover image file (preferred). Overrides the URL if both are set.',
    )
    cover_image_url = models.URLField(
        max_length=500, blank=True, default='',
        help_text='Or paste an external image URL. Used only if no file is uploaded above.',
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-year']
        verbose_name = 'Prerna Edition'
        verbose_name_plural = 'Prerna Editions'

    def __str__(self):
        return f'{self.title} ({self.year})'

    @property
    def cover_url(self):
        """Return the best available cover URL (uploaded file takes priority)."""
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or ''
