"""Seed the Samithi Connect photos synced from Google Drive, so every developer
and a fresh production deployment see the photos on `migrate` — no Google API
key or sync needed to view, because the thumbnail/full links point straight at
Google's public CDN.

The data lives in `seed_data/samithi_photos_seed_data.json` (exported from an
admin Drive sync — contains only public Drive file ids and CDN image links, no
API key). Idempotent (update_or_create): re-running never duplicates rows and
never overwrites edits an admin has made in the same environment.
"""

import json
from pathlib import Path

from django.db import migrations

SEED_FILE = Path(__file__).resolve().parent / 'seed_data' / 'samithi_photos_seed_data.json'


def load_seed():
    with open(SEED_FILE, encoding='utf-8') as handle:
        return json.load(handle)


def seed_photos(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    SamithiPhoto = apps.get_model('website', 'SamithiPhoto')
    data = load_seed()

    # Activities are already created by 0022; look them up by (wing, title).
    activity_map = {}
    for a in data['activities']:
        activity = SamithiActivity.objects.filter(wing=a['wing'], title=a['title']).first()
        if activity is None:
            activity, _ = SamithiActivity.objects.update_or_create(
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

    # Keep each activity's cached photo_count in step with the seeded photos.
    for activity in activity_map.values():
        activity.photo_count = SamithiPhoto.objects.filter(activity=activity, is_active=True).count()
        activity.save(update_fields=['photo_count'])


def unseed_photos(apps, schema_editor):
    SamithiPhoto = apps.get_model('website', 'SamithiPhoto')
    data = load_seed()
    file_ids = [p['drive_file_id'] for p in data['photos']]
    SamithiPhoto.objects.filter(drive_file_id__in=file_ids).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0022_seed_samithi_activities'),
    ]

    operations = [
        migrations.RunPython(seed_photos, unseed_photos),
    ]
