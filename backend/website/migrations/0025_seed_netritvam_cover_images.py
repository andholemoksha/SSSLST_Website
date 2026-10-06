"""Data migration: set cover images for the Netritvam magazine issues.

Follows the same approach as the Newsletter/Prerana cover seed: the cover
images are bundled with the frontend under ``/assets/netritvam/`` and their
paths are stored on each issue's ``cover_image_url`` field, so the card renders
them generically via ``issue.cover_image``. Idempotent — keyed on serial_number.
"""

from django.db import migrations


# (serial_number, cover path served by the frontend from public/assets/netritvam/)
COVER_IMAGES = [
    (1, '/assets/netritvam/netritvam-1-cover.jpg'),
    (2, '/assets/netritvam/netritvam-2-cover.jpg'),
    (3, '/assets/netritvam/netritvam-3-cover.jpg'),
    (4, '/assets/netritvam/netritvam-4-cover.jpg'),
    (5, '/assets/netritvam/netritvam-5-cover.jpg'),
    (6, '/assets/netritvam/netritvam-6-cover.jpg'),
    (7, '/assets/netritvam/netritvam-7-cover.jpg'),
]


def seed_cover_images(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for serial_number, cover in COVER_IMAGES:
        Netritvam.objects.filter(serial_number=serial_number).update(
            cover_image_url=cover,
        )


def unseed_cover_images(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for serial_number, _ in COVER_IMAGES:
        Netritvam.objects.filter(serial_number=serial_number).update(
            cover_image_url='',
        )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0024_merge_deploy_migration_leaves'),
    ]

    operations = [
        migrations.RunPython(seed_cover_images, unseed_cover_images),
    ]
