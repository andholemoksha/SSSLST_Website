"""Rename remaining "Valedictory" gallery albums to "Valedictory Session".

Brings the 2021/2022/2023/2024 valedictory albums in line with the 2026 one so
every valedictory card reads "Valedictory Session". Album titles are also
updated in ``seed_data/gallery_seed_data.json``. Idempotent and reversible.
"""

from django.db import migrations

OLD = 'Valedictory'
NEW = 'Valedictory Session'


def forward(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryAlbum.objects.filter(title=OLD).update(title=NEW)


def backward(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    # Only revert the ones that were plain "Valedictory" (year <= 2024); the
    # 2026 album was already "Valedictory Session" before this migration.
    GalleryAlbum.objects.filter(title=NEW).exclude(year=2026).update(title=OLD)


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0041_merge_hira_albums'),
    ]

    operations = [
        migrations.RunPython(forward, backward),
    ]
