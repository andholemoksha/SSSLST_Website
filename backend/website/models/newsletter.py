"""Models for the monthly Newsletter (HeyZine flip-book) publications."""

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


class Newsletter(models.Model):
    """A single monthly newsletter edition backed by a HeyZine flip-book link."""

    month = models.PositiveSmallIntegerField(
        choices=MONTH_CHOICES,
        help_text='Month this edition covers.',
    )
    year = models.PositiveIntegerField(
        db_index=True,
        help_text='Year this edition covers.',
    )
    title = models.CharField(
        max_length=255,
        blank=True,
        help_text='Optional custom title. Defaults to "<Month> <Year>" if left blank.',
    )
    flipbook_url = models.URLField(
        max_length=500,
        unique=True,
        help_text='HeyZine flip-book link opened when a reader clicks "Read newsletter".',
    )
    cover_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='Optional cover image URL shown on the card.',
    )
    cover_image = models.ImageField(
        upload_to='newsletters/covers/',
        blank=True,
        null=True,
        help_text='Optional cover image upload. Takes precedence over the cover image URL.',
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Newest year first, but months within a year run January -> December.
        ordering = ['-year', 'month', 'id']
        constraints = [
            models.UniqueConstraint(
                fields=['year', 'month'],
                name='unique_newsletter_year_month',
            ),
        ]
        verbose_name = 'Newsletter'
        verbose_name_plural = 'Newsletters'

    def __str__(self):
        return self.display_title

    @property
    def display_title(self):
        if self.title:
            return self.title
        return f'{self.get_month_display()} {self.year}'

    @property
    def cover_image_source(self):
        """Return the effective cover image (upload wins over URL), or '' if none."""
        if self.cover_image:
            return self.cover_image.url
        return self.cover_image_url or ''
