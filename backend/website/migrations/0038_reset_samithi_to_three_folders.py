"""Reset Samithi Connect to exactly three activities — one per wing — with photos.

Removes all previously-seeded activities/photos (the 16 cards from 0022/0023 and
the carousel safeguard from 0037) and replaces them with a single activity per
wing (Spiritual / Service / Education), each pointing at one Google Drive folder,
plus all of that folder's photos seeded statically from JSON.

The photo rows carry static Drive file ids + public CDN links (exported once
from a live Drive sync), so a fresh ``migrate`` shows every photo with **no
Google API key and no network call** — the same approach as the other seed
migrations. Admins can still re-sync a folder later (with a key) to refresh.

Idempotent (update_or_create) and reversible.
"""

import json
import re
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'samithi_three_folders_seed.json'


def load_seed():
    with open(SEED_FILE, encoding='utf-8') as handle:
        return json.load(handle)


def _folder_id(url):
    match = re.search(r'/folders/([A-Za-z0-9_-]+)', url or '')
    return match.group(1) if match else ''


def reset_to_three_folders(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    SamithiPhoto = apps.get_model('website', 'SamithiPhoto')
    data = load_seed()

    # Wipe everything that was seeded or synced before.
    SamithiPhoto.objects.all().delete()
    SamithiActivity.objects.all().delete()

    activity_map = {}
    for a in data['activities']:
        activity = SamithiActivity.objects.create(
            wing=a['wing'],
            title=a['title'],
            slug=a.get('slug', a['wing']),
            description=a.get('description', ''),
            drive_folder_url=a.get('drive_folder_url', ''),
            drive_folder_id=_folder_id(a.get('drive_folder_url', '')),
            order=a.get('order', 0),
            is_active=a.get('is_active', True),
            photo_count=0,
        )
        activity_map[(a['wing'], a['title'])] = activity

    for p in data['photos']:
        activity = activity_map.get((p['wing'], p['activity_title']))
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
                'is_active': p.get('is_active', True),
            },
        )

    # Keep each activity's cached photo_count in step.
    for activity in activity_map.values():
        activity.photo_count = SamithiPhoto.objects.filter(activity=activity, is_active=True).count()
        activity.save(update_fields=['photo_count'])


def remove_three_folders(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    data = load_seed()
    titles = [a['title'] for a in data['activities']]
    # Photos cascade via the FK on delete.
    SamithiActivity.objects.filter(title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0037_seed_samithi_carousel_images'),
    ]

    operations = [
        migrations.RunPython(reset_to_three_folders, remove_three_folders),
    ]
