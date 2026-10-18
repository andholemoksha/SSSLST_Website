"""Pin a fixed cover (thumbnail) for the two 2025 gallery albums.

The album cover otherwise defaults to whichever photo is first by order, so a
later reorder would change the card thumbnail. This sets an explicit
``cover_image_url`` on the 2025 "Induction Session - Sai Kulwant Hall" and
"Valedictory Session" albums (the photo chosen as first after the reorder), so
the card thumbnail stays fixed regardless of future ordering.

Values mirror ``seed_data/gallery_seed_data.json``. Idempotent and reversible.
"""

from django.db import migrations

YEAR = 2025
COVERS = {
    'Induction Session - Sai Kulwant Hall':
        'https://drive.google.com/thumbnail?id=1Rc53l-3ujroIHiFyJfjjyeGMRtMR9x6s&sz=w400',
    'Valedictory Session':
        'https://drive.google.com/thumbnail?id=1JNRtK0jI5KPbasqxZf6EiplhfdDvyrSx&sz=w400',
}


def set_covers(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    for title, url in COVERS.items():
        GalleryAlbum.objects.filter(year=YEAR, title=title).update(cover_image_url=url)


def clear_covers(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryAlbum.objects.filter(year=YEAR, title__in=COVERS.keys()).update(cover_image_url='')


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0045_merge_20261018_0049'),
    ]

    operations = [
        migrations.RunPython(set_covers, clear_covers),
    ]
