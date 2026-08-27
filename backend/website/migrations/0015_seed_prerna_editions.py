"""Data migration: seed initial Prerna yearbook editions (2020-2026).

The admin can update the pdf_url for each year to point to the specific
file or folder in Google Drive. Initial URLs point to the parent Drive folder.
"""

from django.db import migrations


DRIVE_PARENT = 'https://drive.google.com/drive/folders/1qtc_1DX_ls1Nf_R0GgfvwgbsHDu2cufT'

EDITIONS = [
    {'year': 2020, 'title': 'Prerana 2020', 'description': '', 'cover': '/assets/prerna/prerana-2020.jpg'},
    {'year': 2021, 'title': 'Prerana 2021', 'description': '', 'cover': '/assets/prerna/prerana-2021.jpg'},
    {'year': 2022, 'title': 'Prerana 2022', 'description': '', 'cover': '/assets/prerna/prerana-2022.jpg'},
    {'year': 2023, 'title': 'Prerana 2023', 'description': '', 'cover': '/assets/prerna/prerana-2023.jpg'},
    {'year': 2024, 'title': 'Prerana 2024', 'description': '', 'cover': '/assets/prerna/prerana-2024.jpg'},
    {'year': 2025, 'title': 'Prerana 2025', 'description': '', 'cover': '/assets/prerna/prerana-2025.jpg'},
]


def seed_data(apps, schema_editor):
    PrernaEdition = apps.get_model('website', 'PrernaEdition')
    for edition in EDITIONS:
        PrernaEdition.objects.update_or_create(
            year=edition['year'],
            defaults={
                'title': edition['title'],
                'description': edition['description'],
                'pdf_url': DRIVE_PARENT,
                'cover_image_url': edition['cover'],
                'is_active': True,
            },
        )


def unseed_data(apps, schema_editor):
    PrernaEdition = apps.get_model('website', 'PrernaEdition')
    PrernaEdition.objects.filter(year__in=[e['year'] for e in EDITIONS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0014_prerna_edition'),
    ]

    operations = [
        migrations.RunPython(seed_data, unseed_data),
    ]
