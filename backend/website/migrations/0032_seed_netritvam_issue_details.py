"""Set the Netritvam issue titles, months and years.

Keyed on the stable ``flipbook_url`` (the issues were previously serial 1-7).
Idempotent: re-running updates the same rows and never duplicates. The reverse
restores generic placeholder titles so the migration can be unapplied.
"""

from django.db import migrations


# flipbook_url -> (title, month, year)
ISSUE_DETAILS = {
    'https://heyzine.com/flip-book/3b5fb68b15.html': ('Inaugural / New Year Issue', 1, 2025),
    'https://heyzine.com/flip-book/160622ba0d.html': ('Aradhana Mahotsav Issue', 4, 2025),
    'https://heyzine.com/flip-book/f83b22df95.html': ('Guru Poornima Issue', 7, 2025),
    'https://heyzine.com/flip-book/5734564ab1.html': ('Swami Birthday / Centenary Issue', 11, 2025),
    'https://heyzine.com/flip-book/17a32569d5.html': ('New Year Issue', 1, 2026),
    'https://heyzine.com/flip-book/9ea1e84bf3.html': ('Aradhana Mahotsav Issue', 4, 2026),
    'https://heyzine.com/flip-book/50ec5ecc53.html': ('Guru Poornima Issue', 7, 2026),
}


def set_issue_details(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for flipbook_url, (title, month, year) in ISSUE_DETAILS.items():
        Netritvam.objects.filter(flipbook_url=flipbook_url).update(
            title=title,
            month=month,
            year=year,
        )


def clear_issue_details(apps, schema_editor):
    Netritvam = apps.get_model('website', 'Netritvam')
    for index, flipbook_url in enumerate(ISSUE_DETAILS, start=1):
        # Restore distinct placeholder month/year so the unique(year, month)
        # constraint (added later) is not violated if this is reversed.
        Netritvam.objects.filter(flipbook_url=flipbook_url).update(
            title='',
            month=((index - 1) % 12) + 1,
            year=2000 + index,
        )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0031_netritvam_month_year'),
    ]

    operations = [
        migrations.RunPython(set_issue_details, clear_issue_details),
    ]
