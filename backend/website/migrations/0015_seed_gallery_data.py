"""Seed the Photo Gallery (albums + photos) so every developer and a fresh
production deployment see the full gallery on `migrate` — no Google API key or
sync needed to view, because the thumbnail/full links point straight at Google's
public CDN.

The data lives in `seed_data/gallery_seed_data.json` (exported from Drive syncs).
This migration is idempotent (update_or_create), so re-running never duplicates
rows and never overwrites edits an admin has made in the same environment.
"""

import json
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'gallery_seed_data.json'


def load_seed():
    with open(SEED_FILE, encoding='utf-8') as handle:
        return json.load(handle)


def seed_gallery(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryPhoto = apps.get_model('website', 'GalleryPhoto')
    data = load_seed()

    # Albums keyed by (year, title) — matches the unique constraint.
    album_map = {}
    for a in data['albums']:
        album, _ = GalleryAlbum.objects.update_or_create(
            year=a['year'],
            title=a['title'],
            defaults={
                'description': a.get('description', ''),
                'drive_folder_url': a.get('drive_folder_url', ''),
                'cover_image_url': a.get('cover_image_url', ''),
                'order': a.get('order', 0),
                'is_active': a.get('is_active', True),
                'photo_count': a.get('photo_count', 0),
            },
        )
        album_map[(a['year'], a['title'])] = album

    for p in data['photos']:
        album = album_map.get((p['album_year'], p['album_title']))
        if album is None:
            continue
        GalleryPhoto.objects.update_or_create(
            album=album,
            drive_file_id=p['drive_file_id'],
            defaults={
                'title': p.get('title', ''),
                'thumbnail_link': p['thumbnail_link'],
                'full_link': p['full_link'],
                'width': p.get('width'),
                'height': p.get('height'),
                'order': p.get('order', 0),
                'is_active': p.get('is_active', True),
            },
        )


def unseed_gallery(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryPhoto = apps.get_model('website', 'GalleryPhoto')
    data = load_seed()
    file_ids = [p['drive_file_id'] for p in data['photos']]
    GalleryPhoto.objects.filter(drive_file_id__in=file_ids).delete()
    for a in data['albums']:
        GalleryAlbum.objects.filter(year=a['year'], title=a['title']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0014_galleryalbum_galleryphoto'),
    ]

    operations = [
        migrations.RunPython(seed_gallery, unseed_gallery),
    ]
