"""Seed the Samithi Connect activities (wing + title + Drive folder) so every
developer and a fresh production deployment start with the activity cards on
`migrate`.

Photos themselves are NOT seeded here — an admin runs "Sync from Drive" (which
needs GOOGLE_API_KEY) to pull them in. This migration just creates the activity
cards with their Drive folder links. Idempotent (update_or_create)."""

from django.db import migrations

# (wing, title, slug, order, drive_folder_url)
# The slug matches the frontend route slug in content/samithiConnect.js so the
# existing activity cards link straight to their photos.
SEED_ACTIVITIES = [
    # Spiritual
    ('spiritual', 'Vedam', 'vedam', 3, 'https://drive.google.com/drive/folders/1r6BfoCAdEn5IcSDkmA2j_j0ibLOTSJ2-'),
    ('spiritual', 'Nagar Sankeertan', 'nagar-sankeertan', 2, 'https://drive.google.com/drive/folders/1gkaNfp31evxGSBSLgKAryYNrhiTKoHK7'),
    ('spiritual', 'Meditation', 'meditation', 5, 'https://drive.google.com/drive/folders/1EWFb5je8MwHxu1QYpbZnDlIyKatzz5Xy'),
    ('spiritual', 'Bhajan', 'bhajan', 1, 'https://drive.google.com/drive/folders/1Ey7Vo_NKYsK37XTRjGGgB06yssvjeckZ'),
    ('spiritual', 'Any Parayanam', 'parayanam', 4, 'https://drive.google.com/drive/folders/124ke6kJbjEZ2kPhMcNs7cgx63uL0fVcJ'),
    ('spiritual', 'Other Spiritual Activity', 'other-spiritual-activity', 6, 'https://drive.google.com/drive/folders/1WBT9ycNu-OFTGUM6lh6rDPuVLIIG7QgX'),
    # Service
    ('service', 'Village Seva', 'village-seva', 4, 'https://drive.google.com/drive/folders/14T14BJVXpAvVbIvtknrmxNikb3dr02te'),
    ('service', 'Skill Development', 'skill-development', 5, 'https://drive.google.com/drive/folders/1IAhRLtmQkzG8TjwBwuYxL82vZTQff_3i'),
    ('service', 'Narayan Seva', 'narayan-seva', 1, 'https://drive.google.com/drive/folders/1Ch0guCqWZh4p1m5v8ADKOl8-zJP82PXL'),
    ('service', 'Medical Camps / Liquid Love', 'medical-camps-liquid-love', 2, 'https://drive.google.com/drive/folders/1zq9zwLP-2gP1RRDh3MhZKOTzXb4KwZE5'),
    ('service', 'Disaster Management', 'disaster-management', 3, 'https://drive.google.com/drive/folders/1G8kflJ3xeVeeJ5UQQ9gRuaMZX8DMa8GW'),
    ('service', 'Other Service Activity', 'other-service-activity', 6, 'https://drive.google.com/drive/folders/1l0pJQG7F1E9NmrF2jVDE0pXem0dfKd1O'),
    # Education
    ('education', 'Vidya Jyoti', 'vidya-jyoti', 3, 'https://drive.google.com/drive/folders/1q_-iaL7gUleazbyEWF_fxPbYb1r7Jxuv'),
    ('education', 'Sri Sathya Sai Balvikas', 'sri-sathya-sai-balvikas', 1, 'https://drive.google.com/drive/folders/1yDyULTHBNXOZTnHtQlvZWkmz2ks7QMXp'),
    ('education', 'Parenting', 'parenting', 2, 'https://drive.google.com/drive/folders/1hs3AJvd36PC1il32Mbv51oDrl97_4T7R'),
    ('education', 'Other Educational Initiatives', 'other-educational-initiatives', 4, 'https://drive.google.com/drive/folders/19MGpNAys7O9bx9OKbEaQAa9GX9YF4AhG'),
]


def _folder_id(url):
    import re
    m = re.search(r'/folders/([A-Za-z0-9_-]+)', url)
    return m.group(1) if m else ''


def seed_activities(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    for wing, title, slug, order, url in SEED_ACTIVITIES:
        SamithiActivity.objects.update_or_create(
            wing=wing,
            title=title,
            defaults={
                'slug': slug,
                'drive_folder_url': url,
                'drive_folder_id': _folder_id(url),
                'order': order,
                'is_active': True,
            },
        )


def unseed_activities(apps, schema_editor):
    SamithiActivity = apps.get_model('website', 'SamithiActivity')
    for wing, title, _slug, _order, _url in SEED_ACTIVITIES:
        SamithiActivity.objects.filter(wing=wing, title=title).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0021_samithiactivity_samithiphoto'),
    ]

    operations = [
        migrations.RunPython(seed_activities, unseed_activities),
    ]
