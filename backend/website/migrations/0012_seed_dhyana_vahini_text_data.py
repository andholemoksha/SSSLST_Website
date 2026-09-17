"""Data migration: originally seeded the 2026 Dhyana Vahini written reflections.

NOTE (superseded): the original version of this migration mistakenly seeded the
DhyanaVahiniText table with the *Samithi Connect* reflections. It has been
neutralised to a no-op so that a fresh `migrate` never writes that wrong data.
The correct Dhyana Vahini reflections are seeded by
``0019_fix_dhyana_vahini_text_seed`` instead.

This migration is intentionally kept (not deleted) so migration history stays
consistent for environments that have already applied it. Its name and
dependency are unchanged; only its operations are now empty.
"""

from django.db import migrations


def noop(apps, schema_editor):
    """Intentionally does nothing. See module docstring and 0019."""


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0011_seed_samithi_connect_data'),
    ]

    operations = [
        migrations.RunPython(noop, noop),
    ]
