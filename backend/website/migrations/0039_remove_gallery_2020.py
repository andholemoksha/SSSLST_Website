"""Remove the 2020 Photo Gallery album and all its photos.

The gallery year chips on the site are driven by the API (only years that have
active albums with photos appear), so deleting the 2020 album here also removes
the "2020" chip from the UI — no frontend change needed.

The 2020 entries were also removed from
``seed_data/gallery_seed_data.json`` so fresh installs never seed them.

Reverse is a no-op: the deleted 2020 data is not restored (it is gone from the
seed too). Idempotent.
"""

from django.db import migrations


def remove_2020(apps, schema_editor):
    GalleryAlbum = apps.get_model('website', 'GalleryAlbum')
    GalleryPhoto = apps.get_model('website', 'GalleryPhoto')
    # Photos cascade on album delete, but delete explicitly to be safe/clear.
    GalleryPhoto.objects.filter(album__year=2020).delete()
    GalleryAlbum.objects.filter(year=2020).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0038_reset_samithi_to_three_folders'),
    ]

    operations = [
        migrations.RunPython(remove_2020, migrations.RunPython.noop),
    ]
