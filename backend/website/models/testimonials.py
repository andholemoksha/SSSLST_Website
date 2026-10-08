"""Model for video Testimonials shown on the Testimonials page.

Each testimonial is simply a Google Drive video link managed from the admin.
The frontend shows a numbered card ("Testimonial 1", "Testimonial 2", ...)
with a cover photo that opens the video in a modal player when clicked.
"""

from django.db import models


class Testimonial(models.Model):
    """A single testimonial video (a Google Drive share link)."""

    video_url = models.URLField(
        max_length=500,
        unique=True,
        help_text=(
            'Google Drive share link to the testimonial video, e.g. '
            'https://drive.google.com/file/d/<id>/view. The file must be shared '
            'as "Anyone with the link -> Viewer" so visitors can watch it.'
        ),
    )
    cover_image = models.ImageField(
        upload_to='testimonials/covers/',
        blank=True,
        null=True,
        help_text='Optional cover image upload. Takes precedence over everything else.',
    )
    cover_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='Optional cover image URL. Used if no file is uploaded above. '
                  'If neither is set, a thumbnail is auto-derived from the Drive video.',
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text='Lower numbers appear first. Cards are numbered by this order.',
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f'Testimonial #{self.pk}'

    @property
    def cover_image_source(self):
        """Effective admin-set cover (upload wins over URL), or '' if none set."""
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or ''
