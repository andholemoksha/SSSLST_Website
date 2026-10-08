"""Query logic for the Projects Archive.

The public archive asks for a filtered, sorted list of active projects. Filters
are AND across types (year AND state AND gender AND category) and OR within a
type (multi-select). Search matches title OR description (case-insensitive).

Sort tiers (decreasing priority):
  1. search relevance  — only when a search term is present: a title match
     ranks above a description-only match.
  2. year descending   — newest first (the default).
  3. state ascending   — alphabetical.
  4. order, id         — stable final tiebreak.
"""

import csv
import io

from django.db import transaction
from django.db.models import Case, IntegerField, Q, Value, When

from website.models import Gender, Project, State, Wing


def _as_list(value):
    """Normalise a single value or iterable into a clean list (drop blanks/None)."""
    if value is None:
        return []
    if isinstance(value, (str, int)):
        values = [value]
    else:
        values = list(value)
    return [v for v in values if v not in (None, '')]


def search_projects(*, search=None, year=None, state=None, gender=None, category=None):
    """Return a filtered, sorted queryset of active projects.

    All keyword args accept either a single value or a list of values.
    """
    queryset = Project.objects.filter(is_active=True)

    years = _as_list(year)
    states = _as_list(state)
    genders = _as_list(gender)
    categories = _as_list(category)

    if years:
        queryset = queryset.filter(year__in=years)
    if states:
        queryset = queryset.filter(state__in=states)
    if genders:
        queryset = queryset.filter(gender__in=genders)
    if categories:
        queryset = queryset.filter(category__in=categories)

    term = (search or '').strip()
    if term:
        queryset = queryset.filter(
            Q(title__icontains=term) | Q(description__icontains=term)
        )
        # Relevance tier: 0 when the title matches, 1 for description-only.
        queryset = queryset.annotate(
            relevance=Case(
                When(title__icontains=term, then=Value(0)),
                default=Value(1),
                output_field=IntegerField(),
            )
        ).order_by('relevance', '-year', 'state', 'order', 'id')
    else:
        queryset = queryset.order_by('-year', 'state', 'order', 'id')

    return queryset


# ─────────────────────────── CSV import ───────────────────────────

REQUIRED_CSV_COLUMNS = {'title', 'year', 'state', 'gender', 'category', 'document_url'}


class ProjectImportError(ValueError):
    """Raised when a projects CSV is malformed or has invalid values."""


def _choice_lookup(choices_cls):
    """Map both stored values and display labels (lowercased) -> canonical value."""
    lookup = {}
    for choice in choices_cls:
        lookup[choice.value.lower()] = choice.value
        lookup[choice.label.lower()] = choice.value
    return lookup


_STATE_LOOKUP = _choice_lookup(State)
_GENDER_LOOKUP = _choice_lookup(Gender)
_CATEGORY_LOOKUP = _choice_lookup(Wing)


def _resolve_choice(line_number, field, raw, lookup):
    value = (raw or '').strip()
    if not value:
        raise ProjectImportError(f'Row {line_number}: {field} is required')
    resolved = lookup.get(value.lower())
    if resolved is None:
        allowed = ', '.join(sorted(set(lookup.values())))
        raise ProjectImportError(
            f'Row {line_number}: invalid {field} "{value}". Allowed: {allowed}'
        )
    return resolved


def _parse_row(line_number, row):
    title = (row.get('title') or '').strip()
    if not title:
        raise ProjectImportError(f'Row {line_number}: title is required')

    year_raw = (row.get('year') or '').strip()
    try:
        year = int(year_raw)
    except ValueError as exc:
        raise ProjectImportError(
            f'Row {line_number}: year "{year_raw}" is not a number'
        ) from exc

    document_url = (row.get('document_url') or '').strip()
    if not document_url:
        raise ProjectImportError(f'Row {line_number}: document_url is required')

    return {
        'title': title,
        'year': year,
        'state': _resolve_choice(line_number, 'state', row.get('state'), _STATE_LOOKUP),
        'gender': _resolve_choice(line_number, 'gender', row.get('gender'), _GENDER_LOOKUP),
        'category': _resolve_choice(line_number, 'category', row.get('category'), _CATEGORY_LOOKUP),
        'description': (row.get('description') or '').strip(),
        'document_url': document_url,
    }


def parse_projects_csv(text, *, skip_invalid=False):
    """Parse + validate CSV text into (rows, skipped).

    `rows` is a list of valid row dicts; `skipped` is a list of
    (line_number, reason) for rows that failed validation.

    With skip_invalid=False (default), the first invalid row raises
    ProjectImportError. With skip_invalid=True, invalid rows are collected in
    `skipped` and excluded from `rows` instead of aborting.

    A missing header or wrong columns always raises, regardless of skip_invalid.
    """
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames or not REQUIRED_CSV_COLUMNS.issubset(reader.fieldnames):
        raise ProjectImportError(
            'CSV must contain columns: '
            'title,year,state,gender,category,description,document_url'
        )

    rows, skipped = [], []
    seen = set()  # (title, year) already taken earlier in the file
    for line_number, row in enumerate(reader, start=2):
        try:
            parsed = _parse_row(line_number, row)
        except ProjectImportError as exc:
            if not skip_invalid:
                raise
            skipped.append((line_number, str(exc)))
            continue

        key = (parsed['title'], parsed['year'])
        if key in seen:
            reason = f'Row {line_number}: duplicate title + year ("{parsed["title"]}", {parsed["year"]})'
            if not skip_invalid:
                raise ProjectImportError(reason)
            skipped.append((line_number, reason))
            continue

        seen.add(key)
        rows.append(parsed)
    return rows, skipped


def import_projects_from_csv(text, *, dry_run=False, skip_invalid=False):
    """Upsert projects from CSV text (natural key: title + year).

    Returns (created, updated, skipped) where `skipped` is a list of
    (line_number, reason). With dry_run=True, validates and counts but writes
    nothing. With skip_invalid=True, rows with invalid/blank mandatory fields
    are skipped and reported instead of aborting the import.
    """
    rows, skipped = parse_projects_csv(text, skip_invalid=skip_invalid)

    created = updated = 0
    for row in rows:
        exists = Project.objects.filter(title=row['title'], year=row['year']).exists()
        if exists:
            updated += 1
        else:
            created += 1

    if dry_run:
        return created, updated, skipped

    with transaction.atomic():
        for row in rows:
            Project.objects.update_or_create(
                title=row['title'],
                year=row['year'],
                defaults={
                    'state': row['state'],
                    'gender': row['gender'],
                    'category': row['category'],
                    'description': row['description'],
                    'document_url': row['document_url'],
                    'is_active': True,
                },
            )

    return created, updated, skipped
