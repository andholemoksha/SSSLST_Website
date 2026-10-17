"""Rename Photo Gallery album titles.

1. Every induction album ("Induction Session" in 2026 and "Induction" in
   2023/2024/2025) -> "Induction Session - Sai Kulwant Hall".
2. The 2026 "Induction Day 2" album -> "Valedictory Session".

Album titles are also updated in ``seed_data/gallery_seed_data.json`` so fresh
installs get the new titles. Idempotent and reversible.
"""

from django.db import migrations

INDUCTION_NEW = 'Induction Session - Sai Kulwant Hall'
INDUCTION_OLD = ['Induction Session', 'Induction']


def forward(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryAlbum.objects.filter(title__in=INDUCTION_OLD).update(title=INDUCTION_NEW)
    GalleryAlbum.objects.filter(year=2026, title='Induction Day 2').update(title='Valedictory Session')


def backward(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    # Best-effort reverse: 2026 valedictory back to its old name; the induction
    # merge is not uniquely reversible (several titles collapsed into one), so
    # restore the 2026 one to "Induction Session" and leave the rest.
    GalleryAlbum.objects.filter(year=2026, title='Valedictory Session').update(title='Induction Day 2')
    GalleryAlbum.objects.filter(year=2026, title=INDUCTION_NEW).update(title='Induction Session')


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0039_remove_gallery_2020'),
    ]

    operations = [
        migrations.RunPython(forward, backward),
    ]
