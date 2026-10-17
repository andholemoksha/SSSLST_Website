"""Replace the Projects Archive with the corrected v3 dataset.

Deletes ALL existing Project rows (the 0028/0033 seeds and any admin additions)
and reseeds from the cleaned source spreadsheet exported to
``seed_data/projects_v3.csv`` (columns: title, year, state, gender, category,
document_url).

Normalization applied while seeding:
- category -> lowercase Wing value ("Service" -> "service"); blank if empty.
- state "Karnataka South" -> "Karnataka" (the sheet's only non-standard state).
- rows missing title or document_url are skipped.

Idempotent on re-run (update_or_create on the natural key). Reversible: the
reverse removes the rows seeded from the CSV.
"""

import csv
from pathlib import Path

from django.db import migrations

CSV_FILE = Path(__file__).resolve().parent / 'seed_data' / 'projects_v3.csv'

CATEGORY_MAP = {
    'spiritual': 'spiritual',
    'service': 'service',
    'education': 'education',
    'youth': 'youth',
    'medical': 'medical',
    'rural': 'rural',
    'environment': 'environment',
    'other': 'other',
}

STATE_FIXES = {
    'Karnataka South': 'Karnataka',
}


def _rows():
    with open(CSV_FILE, encoding='utf-8-sig', newline='') as handle:
        for row in csv.DictReader(handle):
            title = (row.get('title') or '').strip()
            document_url = (row.get('document_url') or '').strip()
            if not title or not document_url:
                continue

            year_raw = (row.get('year') or '').strip()
            try:
                year = int(year_raw)
            except ValueError:
                year = None

            state = (row.get('state') or '').strip()
            state = STATE_FIXES.get(state, state)

            gender = (row.get('gender') or '').strip()
            category = CATEGORY_MAP.get((row.get('category') or '').strip().lower(), '')

            yield {
                'title': title,
                'year': year,
                'state': state,
                'gender': gender,
                'category': category,
                'document_url': document_url,
            }


def reseed(apps, schema_editor):
    Project = apps.get_model('website', 'Project')
    # Remove the entire old archive, then seed the corrected dataset.
    Project.objects.all().delete()
    for order, row in enumerate(_rows(), start=1):
        Project.objects.update_or_create(
            title=row['title'],
            year=row['year'],
            state=row['state'],
            gender=row['gender'],
            defaults={
                'category': row['category'],
                'description': '',
                'document_url': row['document_url'],
                'is_active': True,
                'order': order,
            },
        )


def unseed(apps, schema_editor):
    Project = apps.get_model('website', 'Project')
    titles_years = {(r['title'], r['year']) for r in _rows()}
    for title, year in titles_years:
        Project.objects.filter(title=title, year=year).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0039_update_home_stats'),
    ]

    operations = [
        migrations.RunPython(reseed, unseed),
    ]
