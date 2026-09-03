"""Models for the Photo Gallery.

One admin entry ("Photo Gallery") = a year + a card title + a Google Drive
folder link (+ optional cover). Years are derived from the entries, so the admin
only ever manages this single kind of record. Photos are synced from the Drive
folder into the database, and the public site reads only from the database (it
never calls Google Drive on a user request).
"""

import re

from django.core.exceptions import ValidationError
from django.db import models

# Matches the folder id in links like
# https://drive.google.com/drive/folders/<ID>?usp=drive_link
_DRIVE_FOLDER_RE = re.compile(r'/folders/([A-Za-z0-9_-]+)')


def extract_drive_folder_id(url):
    """Return the Drive folder id from a folder URL, or '' if not found."""
    if not url:
        return ''
    match = _DRIVE_FOLDER_RE.search(url)
    if match:
        return match.group(1)
    # Allow pasting a bare id as well.
    if re.fullmatch(r'[A-Za-z0-9_-]{10,}', url.strip()):
        return url.strip()
    return ''


class GalleryAlbum(models.Model):
    """A single gallery card: a year + a title + a Drive folder of photos.

    This is the ONE record type an admin manages. Add one per card, e.g.
    (2025, "Induction"), (2025, "Valedictory"), (2026, "Sai Hira").
    """

    year = models.PositiveIntegerField(
        db_index=True,
        help_text='The year this card belongs to, e.g. 2025.',
    )
    title = models.CharField(
        max_length=200,
        help_text='Card title, e.g. "Induction", "Valedictory", "Sai Hira".',
    )
    description = models.TextField(blank=True)
    drive_folder_url = models.URLField(
        max_length=500,
        blank=True,
        help_text='Google Drive folder link. Set the folder to "Anyone with the link → Viewer". '
                  'Photos are pulled in automatically when you save (or click "Sync from Drive").',
    )
    drive_folder_id = models.CharField(max_length=100, blank=True, editable=False)
    cover_image_url = models.URLField(
        max_length=600,
        blank=True,
        help_text='Optional cover image URL. If blank, the first photo is used as the cover.',
    )
    cover_image = models.ImageField(
        upload_to='gallery/covers/',
        blank=True,
        null=True,
        help_text='Optional cover image upload. Takes precedence over the cover image URL.',
    )
    photo_count = models.PositiveIntegerField(default=0, editable=False)
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, help_text='Lower numbers show first within a year.')
    last_synced_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'order', 'id']
        verbose_name = 'Photo Gallery'
        verbose_name_plural = 'Photo Gallery'
        constraints = [
            models.UniqueConstraint(fields=['year', 'title'], name='unique_album_title_per_year'),
        ]
        indexes = [
            models.Index(fields=['year', 'is_active', 'order']),
        ]

    def __str__(self):
        return f'{self.year} — {self.title}'

    def clean(self):
        super().clean()
        if self.drive_folder_url and not extract_drive_folder_id(self.drive_folder_url):
            raise ValidationError({
                'drive_folder_url': 'Enter a valid Google Drive folder link (…/folders/<id>).',
            })

    def save(self, *args, **kwargs):
        self.drive_folder_id = extract_drive_folder_id(self.drive_folder_url)
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


class GalleryPhoto(models.Model):
    """A single photo within a gallery card, synced from Google Drive."""

    album = models.ForeignKey(
        GalleryAlbum,
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
        ordering = ['album', 'order', 'id']
        verbose_name = 'Gallery photo'
        verbose_name_plural = 'Gallery photos'
        constraints = [
            models.UniqueConstraint(fields=['album', 'drive_file_id'], name='unique_photo_per_album'),
        ]
        indexes = [
            models.Index(fields=['album', 'is_active', 'order']),
        ]

    def __str__(self):
        return self.title or self.drive_file_id
