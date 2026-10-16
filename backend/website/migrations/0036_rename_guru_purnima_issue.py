"""Rename existing Netritvam "Guru Purnima Issue" rows to "Guru Poornima Issue".

The seed migration (0032) only runs once, so databases that were already
seeded keep the old spelling. This data migration updates those existing rows
to the corrected spelling. Idempotent and reversible.
"""

from django.db import migrations

OLD_TITLE = 'Guru Purnima Issue'
NEW_TITLE = 'Guru Poornima Issue'


def rename_forward(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    Netritvam.objects.filter(title=OLD_TITLE).update(title=NEW_TITLE)


def rename_backward(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    Netritvam.objects.filter(title=NEW_TITLE).update(title=OLD_TITLE)


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0035_merge_20261012_1945'),
    ]

    operations = [
        migrations.RunPython(rename_forward, rename_backward),
    ]
