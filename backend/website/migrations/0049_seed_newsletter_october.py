"""Seed the October 2026 monthly Newsletter edition with its bundled cover.

Same approach as 0047/0048: idempotent (update_or_create on year+month). The
cover image is bundled with the frontend under ``/assets/newsletter/`` and its
path is stored on ``cover_image_url``. Any uploaded ``cover_image`` file is
cleared, since it takes precedence over the URL and uploads are not served
reliably in production.
"""

from django.db import migrations

MONTH = 10
YEAR = 2026
FLIPBOOK_URL = 'https://heyzine.com/flip-book/1d4e3421e3.html'
COVER = '/assets/newsletter/newsletter-10-october.png'


def seed_october(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    Newsletter.objects.update_or_create(
        year=YEAR,
        month=MONTH,
        defaults={
            'flipbook_url': FLIPBOOK_URL,
            'cover_image_url': COVER,
            'cover_image': '',
            'is_active': True,
        },
    )


def unseed_october(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    Newsletter.objects.filter(year=YEAR, month=MONTH).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0048_seed_newsletter_aug_sep_covers'),
    ]

    operations = [
        migrations.RunPython(seed_october, unseed_october),
    ]
