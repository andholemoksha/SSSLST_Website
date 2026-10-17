"""Sync Photo Gallery album display order from the seed data.

Album order was adjusted (in the admin); this applies the current ``order`` for
each album from ``seed_data/gallery_seed_data.json`` to already-migrated
databases (the earlier seeds use update_or_create and do not touch order on
existing rows). Keyed on (year, title). Idempotent.
"""

import json
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'gallery_seed_data.json'


def apply_order(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    with open(SEED_FILE, encoding='utf-8') as handle:
        data = json.load(handle)
    for a in data['albums']:
        GalleryAlbum.objects.filter(year=a['year'], title=a['title']).update(
            order=a.get('order', 0),
        )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0043_seed_gallery_2025'),
    ]

    operations = [
        migrations.RunPython(apply_order, migrations.RunPython.noop),
    ]
