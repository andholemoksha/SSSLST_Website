"""Ensure the Samithi Connect carousel has content on a fresh database.

The carousel shows one representative image per activity across all wings. The
activities (0022) and photos (0023) seeds already populate every wing, but this
migration is a focused safeguard: for each activity in the seed data it ensures
the activity's first photo exists and is active, so the carousel is never empty
after `migrate` — no Google API key or Drive sync needed (links point at
Google's public CDN).

Idempotent (update_or_create) and reversible.
"""

import json
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'samithi_photos_seed_data.json'


def load_seed():
    with open(SEED_FILE, encoding='utf-8') as handle:
        return json.load(handle)


def _first_photo_per_activity(photos):
    """Pick the lowest-order active photo for each (wing, activity_title)."""
    best = {}
    for p in photos:
        if not p.get('is_active', True):
            continue
        key = (p['wing'], p['activity_title'])
        current = best.get(key)
        if current is None or p.get('order', 0) < current.get('order', 0):
            best[key] = p
    return best


def seed_carousel_images(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    SamithiPhoto = apps.get_model('website', 'SamithiPhoto')
    data = load_seed()

    # Make sure every seeded activity exists (0022 normally creates these; this
    # keeps the migration self-contained if that seed was skipped).
    activity_map = {}
    for a in data['activities']:
        activity, _ = SamithiActivity.objects.get_or_create(
            wing=a['wing'],
            title=a['title'],
            defaults={
                'slug': a.get('slug', ''),
                'description': a.get('description', ''),
                'drive_folder_url': a.get('drive_folder_url', ''),
                'order': a.get('order', 0),
                'is_active': a.get('is_active', True),
            },
        )
        activity_map[(a['wing'], a['title'])] = activity

    first_photos = _first_photo_per_activity(data['photos'])
    for (wing, title), p in first_photos.items():
        activity = activity_map.get((wing, title))
        if activity is None:
            continue
        SamithiPhoto.objects.update_or_create(
            activity=activity,
            drive_file_id=p['drive_file_id'],
            defaults={
                'title': p.get('title', ''),
                'thumbnail_link': p['thumbnail_link'],
                'full_link': p['full_link'],
                'width': p.get('width'),
                'height': p.get('height'),
                'order': p.get('order', 0),
                'is_active': True,
            },
        )

    # Keep each activity's cached photo_count in step.
    for activity in activity_map.values():
        activity.photo_count = SamithiPhoto.objects.filter(activity=activity, is_active=True).count()
        activity.save(update_fields=['photo_count'])


def unseed_carousel_images(apps, schema_editor):
    """Remove only the representative photos this migration ensured.

    Other photos seeded by 0023 (and any admin-synced photos) are left intact.
    """
    SamithiPhoto = apps.get_model('website', 'SamithiPhoto')
    data = load_seed()
    first_photos = _first_photo_per_activity(data['photos'])
    file_ids = [p['drive_file_id'] for p in first_photos.values()]
    SamithiPhoto.objects.filter(drive_file_id__in=file_ids).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0036_rename_guru_purnima_issue'),
    ]

    operations = [
        migrations.RunPython(seed_carousel_images, unseed_carousel_images),
    ]
