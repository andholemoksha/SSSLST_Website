"""Models for Samithi Connect activity photos.

Structure: Wing (Spiritual / Service / Education) -> Activity (a section card,
e.g. "Vedam", "Narayan Seva") -> Photos synced from a Google Drive folder.

Admins manage one record per activity: pick the wing, name the activity, paste a
Drive folder link, and sync. Photos are pulled into the database, and the public
site reads only from the database (it never calls Google Drive on a user
request).
"""

from django.core.exceptions import ValidationError
from django.db import models

from website.models.photo_gallery import extract_drive_folder_id


class SamithiActivity(models.Model):
    """One Samithi Connect activity card: a wing + a title + a Drive folder."""

    class Wing(models.TextChoices):
        SPIRITUAL = 'spiritual', 'Spiritual'
        SERVICE = 'service', 'Service'
        EDUCATION = 'education', 'Education'

    wing = models.CharField(
        max_length=20,
        choices=Wing.choices,
        db_index=True,
        help_text='Which wing this activity belongs to.',
    )
    title = models.CharField(
        max_length=200,
        help_text='Activity name, e.g. "Vedam", "Narayan Seva", "Vidya Jyoti".',
    )
    slug = models.SlugField(
        max_length=120,
        blank=True,
        help_text='URL slug used by the website (auto-filled from the title if left blank).',
    )
    description = models.TextField(blank=True)
    drive_folder_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='Google Drive folder link. Set the folder to "Anyone with the link -> Viewer". '
                  'Photos are pulled in automatically when you save (or click "Sync from Drive").',
    )
    drive_folder_id = models.CharField(max_length=100, blank=True, editable=False)
    cover_image_url = models.URLField(
        max_length=600,
        blank=True,
        help_text='Optional cover image URL. If blank, the first photo is used as the cover.',
    )
    cover_image = models.ImageField(
        upload_to='samithi/covers/',
        blank=True,
        null=True,
        help_text='Optional cover image upload. Takes precedence over the cover image URL.',
    )
    photo_count = models.PositiveIntegerField(default=0, editable=False)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, help_text='Lower numbers show first within a wing.')
    last_synced_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['wing', 'order', 'id']
        verbose_name = 'Samithi Connect Activity'
        verbose_name_plural = 'Samithi Connect Activities'
        constraints = [
            models.UniqueConstraint(fields=['wing', 'title'], name='unique_samithi_activity_per_wing'),
        ]
        indexes = [
            models.Index(fields=['wing', 'is_active', 'order']),
        ]

    def __str__(self):
        return f'{self.get_wing_display()} — {self.title}'

    def clean(self):
        super().clean()
        if self.drive_folder_url and not extract_drive_folder_id(self.drive_folder_url):
            raise ValidationError({
                'drive_folder_url': 'Enter a valid Google Drive folder link (.../folders/<id>).',
            })

    def save(self, *args, **kwargs):
        self.drive_folder_id = extract_drive_folder_id(self.drive_folder_url)
        if not self.slug:
            from django.utils.text import slugify
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def cover_source(self):
        """Effective cover: uploaded file > cover URL > first active photo's thumbnail > ''."""
        if self.cover_image:
            return self.cover_image.url
        if self.cover_image_url:
            return self.cover_image_url
        first = self.photos.filter(is_active=True).first()
        return first.thumbnail_link if first else ''


class SamithiPhoto(models.Model):
    """A single photo within a Samithi Connect activity, synced from Google Drive."""

    activity = models.ForeignKey(
        SamithiActivity,
        on_delete=models.CASCADE,
        related_name='photos',
    )
    drive_file_id = models.CharField(max_length=100)
    title = models.CharField(max_length=300, blank=True)
    thumbnail_link = models.URLField(max_length=600, help_text='Small CDN image used in the grid.')
    full_link = models.URLField(max_length=600, help_text='Larger image used in the lightbox.')
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['activity', 'order', 'id']
        verbose_name = 'Samithi Connect Photo'
        verbose_name_plural = 'Samithi Connect Photos'
        constraints = [
            models.UniqueConstraint(fields=['activity', 'drive_file_id'], name='unique_samithi_photo_per_activity'),
        ]
        indexes = [
            models.Index(fields=['activity', 'is_active', 'order']),
        ]

    def __str__(self):
        return self.title or self.drive_file_id
