"""Data migration: set cover images for the Aug/Sep 2026 Newsletter editions.

Follows the same approach as ``0025_seed_newsletter_cover_images``: the cover
images are bundled with the frontend under ``/assets/newsletter/`` and their
paths are stored on each edition's ``cover_image_url`` field, so the card
renders them generically via ``issue.cover_image``. Idempotent — keyed on
(year, month).
"""

from django.db import migrations


# (month, year, cover path served by the frontend from public/assets/newsletter/)
COVER_IMAGES = [
    (8, 2026, '/assets/newsletter/newsletter-08-august.png'),
    (9, 2026, '/assets/newsletter/newsletter-09-september.png'),
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
        ('website', '0047_seed_newsletter_aug_sep'),
    ]

    operations = [
        migrations.RunPython(seed_cover_images, unseed_cover_images),
    ]
