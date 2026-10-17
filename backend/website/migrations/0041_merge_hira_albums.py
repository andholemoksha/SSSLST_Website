"""Merge the 2026 "Hira Day 1" and "Hira Day 2" gallery albums into one.

All photos from both albums are moved into a single album titled
"Sai Hira Sessions" (Day 1 photos first, then Day 2, re-sequenced), and the
now-empty "Hira Day 2" album is deleted.

The same merge is applied in ``seed_data/gallery_seed_data.json`` so fresh
installs get the single album. Idempotent.
"""

from django.db import migrations

YEAR = 2026
NEW_TITLE = 'Sai Hira Sessions'


def merge_hira(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryPhoto = apps.get_model('website', 'GalleryPhoto')

    day1 = GalleryAlbum.objects.filter(year=YEAR, title='Hira Day 1').first()
    day2 = GalleryAlbum.objects.filter(year=YEAR, title='Hira Day 2').first()

    # Choose a surviving album (prefer Day 1; fall back to whichever exists).
    survivor = day1 or day2
    if survivor is None:
        return  # nothing to merge (already merged)

    survivor.title = NEW_TITLE

    # Move Day 2's photos onto the survivor if both exist and are distinct.
    other = day2 if survivor is day1 else None
    if other is not None and other.pk != survivor.pk:
        GalleryPhoto.objects.filter(album=other).update(album=survivor)

    # Re-sequence order: Day 1 photos first (by their current order), then the
    # moved Day 2 photos. Since Day 1 had lower order values already and Day 2's
    # were moved after, a stable renumber by (order, id) keeps the intent.
    photos = list(GalleryPhoto.objects.filter(album=survivor).order_by('order', 'id'))
    for index, photo in enumerate(photos, start=1):
        if photo.order != index:
            photo.order = index
            photo.save(update_fields=['order'])

    survivor.photo_count = GalleryPhoto.objects.filter(album=survivor, is_active=True).count()
    survivor.save(update_fields=['title', 'photo_count'])

    if other is not None and other.pk != survivor.pk:
        other.delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0040_gallery_album_titles'),
    ]

    operations = [
        migrations.RunPython(merge_hira, migrations.RunPython.noop),
    ]
