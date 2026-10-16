"""Models for the Netritvam magazine (HeyZine flip-book) publications."""

from django.db import models


MONTH_CHOICES = [
    (1, 'January'),
    (2, 'February'),
    (3, 'March'),
    (4, 'April'),
    (5, 'May'),
    (6, 'June'),
    (7, 'July'),
    (8, 'August'),
    (9, 'September'),
    (10, 'October'),
    (11, 'November'),
    (12, 'December'),
]


class Netritvam(models.Model):
    """A single Netritvam issue backed by a HeyZine flip-book link.

    Issues are grouped by ``year`` on the site (e.g. "Netritvam 2025"); the
    ``title`` is the issue name (e.g. "Guru Poornima Issue") and ``month`` marks
    when it was published within the year.
    """

    title = models.CharField(
        max_length=255,
        help_text='Issue name shown on the card, e.g. "Guru Poornima Issue".',
    )
    month = models.PositiveSmallIntegerField(
        choices=MONTH_CHOICES,
        help_text='Month this issue was published.',
    )
    year = models.PositiveIntegerField(
        db_index=True,
        help_text='Year this issue belongs to, e.g. 2025.',
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
        # Newest year first, then latest month within a year.
        ordering = ['-year', '-month', 'id']
        constraints = [
            models.UniqueConstraint(
                fields=['year', 'month'],
                name='unique_netritvam_year_month',
            ),
        ]
        verbose_name = 'Netritvam'
        verbose_name_plural = 'Netritvam'

    def __str__(self):
        return self.display_title

    @property
    def display_title(self):
        return self.title or f'Netritvam {self.get_month_display()} {self.year}'

    @property
    def cover_image_source(self):
        """Return the effective cover image (upload wins over URL), or '' if none."""
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or ''
