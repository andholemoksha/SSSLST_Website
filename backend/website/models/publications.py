"""Database models for website publications."""

from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Q


class Publication(models.Model):
    """A published Netritvam issue and its external reader URL."""

    title = models.CharField(max_length=255)
    issue_number = models.PositiveSmallIntegerField(unique=True)
    description = models.TextField(blank=True)
    cover_image_url = models.URLField(max_length=500, blank=True)
    publication_url = models.URLField(max_length=500, unique=True)
    published_date = models.DateField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-issue_number', '-published_date', '-id']
        verbose_name = 'Publication'
        verbose_name_plural = 'Publications'
        constraints = [
            models.UniqueConstraint(
                fields=['is_featured'],
                condition=Q(is_featured=True, is_active=True),
                name='one_active_featured_publication',
            ),
        ]

    def __str__(self):
        return self.title

    def clean(self):
        super().clean()
        if not self.is_active or not self.is_featured:
            return

        another_featured_issue_exists = Publication.objects.filter(
            is_active=True,
            is_featured=True,
        ).exclude(pk=self.pk).exists()
        if another_featured_issue_exists:
            raise ValidationError({
                'is_featured': 'Only one active publication can be featured at a time.',
            })
