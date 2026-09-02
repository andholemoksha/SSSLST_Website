"""Seed the initial Netritvam issues (1-7) so every developer and a fresh
production deployment start with baseline data on `migrate`.

Idempotent (update_or_create): re-running never duplicates rows and never
overwrites issues an admin added through the admin panel."""

from django.db import migrations

# (serial_number, flipbook_url)
SEED_ISSUES = [
    (1, 'https://heyzine.com/flip-book/3b5fb68b15.html'),
    (2, 'https://heyzine.com/flip-book/160622ba0d.html'),
    (3, 'https://heyzine.com/flip-book/f83b22df95.html'),
    (4, 'https://heyzine.com/flip-book/5734564ab1.html'),
    (5, 'https://heyzine.com/flip-book/17a32569d5.html'),
    (6, 'https://heyzine.com/flip-book/9ea1e84bf3.html'),
    (7, 'https://heyzine.com/flip-book/50ec5ecc53.html'),
]


def seed_netritvam(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for serial_number, flipbook_url in SEED_ISSUES:
        Netritvam.objects.update_or_create(
            serial_number=serial_number,
            defaults={
                'flipbook_url': flipbook_url,
                'is_active': True,
            },
        )


def unseed_netritvam(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    serials = [s for s, _ in SEED_ISSUES]
    Netritvam.objects.filter(serial_number__in=serials).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0017_netritvam'),
    ]

    operations = [
        migrations.RunPython(seed_netritvam, unseed_netritvam),
    ]
