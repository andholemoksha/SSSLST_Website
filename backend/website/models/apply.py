"""Model for the admissions "Apply Now" card, controlled from the admin panel.

A single settings row drives the floating "Apply Now" lotus card on the website:
toggle it on/off and set the application form URL. When off, the card is hidden
everywhere; when on, it shows on every page and links to the given URL.
"""

from django.db import models


class AdmissionsSetting(models.Model):
    """Singleton settings row for the site-wide admissions / Apply Now card."""

    is_active = models.BooleanField(
        default=False,
        help_text='When ON, the "Apply Now" card shows on every page. When OFF, it is hidden.',
    )
    apply_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='The Google Form (or any) link opened when a visitor clicks "Apply Now".',
    )
    headline = models.CharField(
        max_length=100,
        blank=True,
        default='Admissions Open',
        help_text='Small heading on the card (e.g. "Admissions Open").',
    )
    subtext = models.CharField(
        max_length=200,
        blank=True,
        default='Applications for the upcoming batch are now open.',
        help_text='Short message shown on the card.',
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Admissions'
        verbose_name_plural = 'Admissions'

    def __str__(self):
        return f'Admissions ({"ON" if self.is_active else "OFF"})'

    def save(self, *args, **kwargs):
        # Enforce a single settings row (singleton).
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        """Return the single settings row, creating it (inactive) if missing."""
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj
