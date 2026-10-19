"""Seed the August and September 2026 monthly Newsletter editions.

Follows the same pattern as 0015_seed_newsletter_data: idempotent
(update_or_create on year+month), so re-running never duplicates rows or
overwrites admin edits. Reverse removes just these two editions.
"""

from django.db import migrations

# (month, year, flipbook_url)
SEED_EDITIONS = [
    (8, 2026, 'https://heyzine.com/flip-book/30ab14b5cf.html'),
    (9, 2026, 'https://heyzine.com/flip-book/70f1c77c9b.html'),
]


def seed_newsletters(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    for month, year, flipbook_url in SEED_EDITIONS:
        Newsletter.objects.update_or_create(
            year=year,
            month=month,
            defaults={
                'flipbook_url': flipbook_url,
                'is_active': True,
            },
        )


def unseed_newsletters(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    urls = [url for _, _, url in SEED_EDITIONS]
    Newsletter.objects.filter(flipbook_url__in=urls).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0046_pin_gallery_2025_covers'),
    ]

    operations = [
        migrations.RunPython(seed_newsletters, unseed_newsletters),
    ]
