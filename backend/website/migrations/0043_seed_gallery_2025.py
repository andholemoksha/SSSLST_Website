"""Seed the 2025 Photo Gallery albums (Induction + Valedictory) and their photos.

The two 2025 albums were populated by syncing their Google Drive folders; the
resulting photos (static file ids + public CDN links) were exported into
``seed_data/gallery_seed_data.json``. This migration seeds those two albums and
their photos from the JSON so other environments / fresh installs show them on
``migrate`` with no Google API key.

Idempotent (update_or_create). Reversible: the reverse removes the two albums.
"""

import json
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'gallery_seed_data.json'
YEAR = 2025
TITLES = ['Induction Session - Sai Kulwant Hall', 'Valedictory Session']


def load_seed():
    with open(SEED_FILE, encoding='utf-8') as handle:
        return json.load(handle)


def seed_2025(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryPhoto = apps.get_model('website', 'GalleryPhoto')
    data = load_seed()

    album_map = {}
    for a in data['albums']:
        if a['year'] != YEAR or a['title'] not in TITLES:
            continue
        album, _ = GalleryAlbum.objects.update_or_create(
            year=a['year'],
            title=a['title'],
            defaults={
                'description': a.get('description', ''),
                'drive_folder_url': a.get('drive_folder_url', ''),
                'cover_image_url': a.get('cover_image_url', ''),
                'order': a.get('order', 0),
                'is_active': a.get('is_active', True),
            },
        )
        album_map[(a['year'], a['title'])] = album

    for p in data['photos']:
        if p['album_year'] != YEAR or p['album_title'] not in TITLES:
            continue
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

    for album in album_map.values():
        album.photo_count = GalleryPhoto.objects.filter(album=album, is_active=True).count()
        album.save(update_fields=['photo_count'])


def unseed_2025(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryAlbum.objects.filter(year=YEAR, title__in=TITLES).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0042_valedictory_session_titles'),
    ]

    operations = [
        migrations.RunPython(seed_2025, unseed_2025),
    ]
