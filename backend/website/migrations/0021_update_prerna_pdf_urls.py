"""Data migration: update Prerna edition pdf_url values to per-year Drive files.

The original seed (0015) pointed every year at the same parent Drive *folder*.
This migration replaces those with the correct per-year Drive *file* links so
each edition opens its own PDF directly. It uses ``update_or_create`` keyed on
``year`` so it also refreshes the rows the admin manages (the admin edits the
same records), and it is idempotent.

It depends on both current migration leaves on develop
(``0020_seed_admissions_setting`` and ``0019_fix_dhyana_vahini_text_seed``),
unifying them so ``migrate`` runs cleanly from a fresh database.
"""

from django.db import migrations


# Per-year Google Drive file links (standard file viewer URLs, open in browser).
EDITIONS = [
    {'year': 2020, 'title': 'Prerana 2020', 'pdf_url': 'https://drive.google.com/file/d/1D-g4Y2nl6apUlNx7EXQ2XKmfcT9xNtn-/view'},
    {'year': 2021, 'title': 'Prerana 2021', 'pdf_url': 'https://drive.google.com/file/d/1kfSiz4ZiQFSjFTQEaHpTbGVt7DiehhJZ/view'},
    {'year': 2022, 'title': 'Prerana 2022', 'pdf_url': 'https://drive.google.com/file/d/1FH9q_9Sb0XG5cFn2DCqx690_45oGooAC/view'},
    {'year': 2023, 'title': 'Prerana 2023', 'pdf_url': 'https://drive.google.com/file/d/1OAW95KaOexGVSeOcrB1lGZ2bfatpBf2V/view'},
    {'year': 2024, 'title': 'Prerana 2024', 'pdf_url': 'https://drive.google.com/file/d/1hP7T3FJjAFuAVV1Y3wSLUpkpIl1mZFTv/view'},
    {'year': 2025, 'title': 'Prerana 2025', 'pdf_url': 'https://drive.google.com/file/d/15fGAT4dx-3Z9I2vJaHCz7mGJxdlYMIzX/view'},
]

# The old parent-folder URL that 0015 seeded for every year.
OLD_PARENT_URL = 'https://drive.google.com/drive/folders/1qtc_1DX_ls1Nf_R0GgfvwgbsHDu2cufT'

COVERS = {
    2020: '/assets/prerna/prerana-2020.jpg',
    2021: '/assets/prerna/prerana-2021.jpg',
    2022: '/assets/prerna/prerana-2022.jpg',
    2023: '/assets/prerna/prerana-2023.jpg',
    2024: '/assets/prerna/prerana-2024.jpg',
    2025: '/assets/prerna/prerana-2025.jpg',
}


def update_urls(apps, schema_editor):
    PrernaEdition = apps.get_model('website', 'PrernaEdition')
    for edition in EDITIONS:
        PrernaEdition.objects.update_or_create(
            year=edition['year'],
            defaults={
                'title': edition['title'],
                'pdf_url': edition['pdf_url'],
                'cover_image_url': COVERS[edition['year']],
                'is_active': True,
            },
        )


def revert_urls(apps, schema_editor):
    """Restore the old parent-folder URL for the affected years."""
    PrernaEdition = apps.get_model('website', 'PrernaEdition')
    for edition in EDITIONS:
        PrernaEdition.objects.filter(year=edition['year']).update(pdf_url=OLD_PARENT_URL)


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0020_seed_admissions_setting'),
        ('website', '0019_fix_dhyana_vahini_text_seed'),
    ]

    operations = [
        migrations.RunPython(update_urls, revert_urls),
    ]
