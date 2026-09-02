"""Seed the initial monthly Newsletter editions (2026) so every developer and a
fresh production deployment start with baseline data on `migrate`.

This is a one-time baseline only. After deployment, admins add new editions
through the admin panel and those are stored in the shared database, visible to
all site visitors immediately. This migration is idempotent (update_or_create)
so re-running never duplicates rows and never overwrites admin-added editions."""

from django.db import migrations

# (month, year, flipbook_url)
SEED_EDITIONS = [
    (2, 2026, 'https://heyzine.com/flip-book/f08c3400d1.html'),
    (3, 2026, 'https://heyzine.com/flip-book/e7f1127908.html'),
    (4, 2026, 'https://heyzine.com/flip-book/4962df1b4d.html'),
    (5, 2026, 'https://heyzine.com/flip-book/44f3dda9f4.html'),
    (6, 2026, 'https://heyzine.com/flip-book/d52778a885.html'),
    (7, 2026, 'https://heyzine.com/flip-book/88086dd966.html'),
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
        ('website', '0014_newsletter'),
    ]

    operations = [
        migrations.RunPython(seed_newsletters, unseed_newsletters),
    ]
