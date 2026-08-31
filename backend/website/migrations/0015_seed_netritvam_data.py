"""Seed the initial Netritvam issues (2026) so every developer and a fresh
production deployment start with baseline data on `migrate`.

This is a one-time baseline only. After deployment, admins add new issues
through the admin panel and those are stored in the shared database, visible to
all site visitors immediately. This migration is idempotent (update_or_create)
so re-running never duplicates rows and never overwrites admin-added issues."""

from django.db import migrations

# (serial_number, year, publication_url)
SEED_ISSUES = [
    (1, 2026, 'https://heyzine.com/flip-book/3b5fb68b15.html'),
    (2, 2026, 'https://heyzine.com/flip-book/160622ba0d.html'),
    (3, 2026, 'https://heyzine.com/flip-book/f83b22df95.html'),
    (4, 2026, 'https://heyzine.com/flip-book/5734564ab1.html'),
    (5, 2026, 'https://heyzine.com/flip-book/17a32569d5.html'),
    (6, 2026, 'https://heyzine.com/flip-book/9ea1e84bf3.html'),
    (7, 2026, 'https://heyzine.com/flip-book/50ec5ecc53.html'),
]


def seed_publications(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for serial_number, year, publication_url in SEED_ISSUES:
        Netritvam.objects.update_or_create(
            year=year,
            serial_number=serial_number,
            defaults={
                'title': f'Netritvam-{serial_number}',
                'publication_url': publication_url,
                'is_active': True,
            },
        )


def unseed_publications(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    urls = [url for _, _, url in SEED_ISSUES]
    Netritvam.objects.filter(publication_url__in=urls).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0014_netritvam'),
    ]

    operations = [
        migrations.RunPython(seed_publications, unseed_publications),
    ]
