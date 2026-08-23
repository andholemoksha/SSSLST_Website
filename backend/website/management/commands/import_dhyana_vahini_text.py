"""Import one complete year's Dhyana Vahini written reflections from CSV."""

import csv

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from website.models import DhyanaVahiniText


class Command(BaseCommand):
    help = 'Import Dhyana Vahini written reflections from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('--year', type=int, required=True)
        parser.add_argument('--file', required=True, help='CSV file path')
        parser.add_argument(
            '--complete',
            action='store_true',
            help='Deactivate existing records for the year missing from the file',
        )
        parser.add_argument('--dry-run', action='store_true')

    def handle(self, *args, **options):
        year = options['year']
        rows = self._read_rows(options['file'])
        row_ids = [row['id'] for row in rows]
        if len(row_ids) != len(set(row_ids)):
            duplicates = sorted({row_id for row_id in row_ids if row_ids.count(row_id) > 1})
            raise CommandError(f'Duplicate id values: {", ".join(duplicates)}')

        existing = {
            reflection.roll_number: reflection
            for reflection in DhyanaVahiniText.objects.filter(year=year)
        }
        created = updated = 0
        for row in rows:
            reflection = existing.get(row['id'])
            if reflection is None:
                created += 1
            elif (
                reflection.name != row['name']
                or reflection.reflection != row['reflection']
                or not reflection.is_active
            ):
                updated += 1

        missing = set(existing) - set(row_ids)
        deactivated = len(missing) if options['complete'] else 0
        if options['dry_run']:
            self.stdout.write(
                self.style.WARNING(
                    f'Dry run. +{created} created, ~{updated} updated, '
                    f'-{deactivated} deactivated.'
                )
            )
            return

        with transaction.atomic():
            for row in rows:
                DhyanaVahiniText.objects.update_or_create(
                    year=year,
                    roll_number=row['id'],
                    defaults={
                        'name': row['name'],
                        'reflection': row['reflection'],
                        'is_active': True,
                    },
                )
            if options['complete'] and missing:
                DhyanaVahiniText.objects.filter(
                    year=year,
                    roll_number__in=missing,
                ).update(is_active=False)

        self.stdout.write(
            self.style.SUCCESS(
                f'Done. +{created} created, ~{updated} updated, '
                f'-{deactivated} deactivated.'
            )
        )

    def _read_rows(self, file_path):
        try:
            with open(file_path, newline='', encoding='utf-8-sig') as csv_file:
                reader = csv.DictReader(csv_file)
                required = {'id', 'name', 'reflection'}
                if not reader.fieldnames or not required.issubset(reader.fieldnames):
                    raise CommandError('CSV must contain id,name,reflection columns')
                rows = []
                for line_number, row in enumerate(reader, start=2):
                    values = {field: (row.get(field) or '').strip() for field in required}
                    if not all(values.values()):
                        raise CommandError(f'Row {line_number} has an empty required field')
                    rows.append(values)
        except FileNotFoundError as exc:
            raise CommandError(f'CSV file not found: {file_path}') from exc
        except UnicodeDecodeError as exc:
            raise CommandError('CSV must be UTF-8 encoded') from exc
        return rows
