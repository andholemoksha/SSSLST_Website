"""Data migration: set cover images for the monthly Newsletter editions.

Follows the same approach as the Prerana cover seed: the cover images are
bundled with the frontend under ``/assets/newsletter/`` and their paths are
stored on each edition's ``cover_image_url`` field, so the card renders them
generically via ``issue.cover_image``. Idempotent — keyed on (year, month).
"""

from django.db import migrations


# (month, year, cover path served by the frontend from public/assets/newsletter/)
COVER_IMAGES = [
    (2, 2026, '/assets/newsletter/newsletter-02-february.jpg'),
    (3, 2026, '/assets/newsletter/newsletter-03-march.jpg'),
    (4, 2026, '/assets/newsletter/newsletter-04-april.jpg'),
    (5, 2026, '/assets/newsletter/newsletter-05-may.jpg'),
    (6, 2026, '/assets/newsletter/newsletter-06-june.jpg'),
    (7, 2026, '/assets/newsletter/newsletter-07-july.jpg'),
]


def seed_cover_images(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    for month, year, cover in COVER_IMAGES:
        Newsletter.objects.filter(year=year, month=month).update(
            cover_image_url=cover,
        )


def unseed_cover_images(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    for month, year, _ in COVER_IMAGES:
        Newsletter.objects.filter(year=year, month=month).update(
            cover_image_url='',
        )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0024_merge_deploy_migration_leaves'),
    ]

    operations = [
        migrations.RunPython(seed_cover_images, unseed_cover_images),
    ]
