"""Bulk-import Projects Archive entries from a CSV file.

CSV columns (header row required):
    title,year,state,gender,category,description,document_url

- state / gender / category values are validated against the model's choices.
  * category accepts either the stored value (e.g. "medical") or the display
    label (e.g. "Medical / Healthcare").
  * gender accepts "Mahila" / "Gents" (case-insensitive).
- Rows are upserted on the natural key (title, year): re-running updates in
  place rather than duplicating.

The actual parsing/upsert lives in website.services.project_service so the
Django admin "Import CSV" page and this command share one validated path.

Usage:
    python manage.py import_projects --file projects.csv
    python manage.py import_projects --file projects.csv --dry-run
"""

from django.core.management.base import BaseCommand, CommandError

from website.services.project_service import (
    ProjectImportError,
    import_projects_from_csv,
)


class Command(BaseCommand):
    help = 'Import Projects Archive entries from a CSV file.'

    def add_arguments(self, parser):
        parser.add_argument('--file', required=True, help='CSV file path')
        parser.add_argument('--dry-run', action='store_true',
                            help='Validate and report counts without writing.')
        parser.add_argument('--skip-invalid', action='store_true',
                            help='Skip (and report) rows with invalid/blank mandatory '
                                 'fields instead of aborting the whole import.')

    def handle(self, *args, **options):
        try:
            with open(options['file'], newline='', encoding='utf-8-sig') as f:
                text = f.read()
        except FileNotFoundError as exc:
            raise CommandError(f'CSV file not found: {options["file"]}') from exc
        except UnicodeDecodeError as exc:
            raise CommandError('CSV must be UTF-8 encoded') from exc

        try:
            created, updated, skipped = import_projects_from_csv(
                text,
                dry_run=options['dry_run'],
                skip_invalid=options['skip_invalid'],
            )
        except ProjectImportError as exc:
            raise CommandError(str(exc)) from exc

        for line_number, reason in skipped:
            self.stdout.write(self.style.WARNING(f'Skipped row {line_number}: {reason}'))

        prefix = 'Dry run. ' if options['dry_run'] else 'Done. '
        self.stdout.write(self.style.SUCCESS(
            f'{prefix}+{created} created, ~{updated} updated, '
            f'-{len(skipped)} skipped.'
        ))
