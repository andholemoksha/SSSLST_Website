"""Seed the initial testimonial videos (Google Drive links) so the page shows
content on a fresh `migrate`. Idempotent (update_or_create keyed on video_url)
so re-running never duplicates rows and never overwrites admin edits.

Admins add/edit testimonial videos through the admin panel afterwards; those
live in the shared database and appear on the site immediately.
"""

from django.db import migrations


# Google Drive share links, in display order. The cards are numbered by order
# ("Testimonial 1", "Testimonial 2", ...).
SEED_VIDEO_URLS = [
    'https://drive.google.com/file/d/10Pn_AEwn26BNNFDLcWtx_ZOh8QuT0vdZ/view',
    'https://drive.google.com/file/d/1BeTww_7segiyvCALvppZAihMUzqirh85/view',
    'https://drive.google.com/file/d/1eEWAmn6c9nI2dubdig6AOPs9LkgYPwnZ/view',
    'https://drive.google.com/file/d/11h9sNeu9I_ZpjNjuh-gkL9pN_S6SWTGN/view',
    'https://drive.google.com/file/d/150gDOyDuxvtqMvUGiFawAH7jCUuDcpS7/view',
    'https://drive.google.com/file/d/1hLl8MtLTsIlwzn2DC__QhJA7tOWF7XiC/view',
    'https://drive.google.com/file/d/1seewP1pRZrqxP0ML0M0W9JsBjId6LYsM/view',
    'https://drive.google.com/file/d/1aWKWa8JNtgdVI6SIYz5sRGEjjxj4kNf7/view',
    'https://drive.google.com/file/d/1Kk5imJunRkj8AuaLOgLgBawfhrUK5S2n/view',
]


def seed_testimonials(apps, schema_editor):
    Testimonial = apps.get_model('website', 'Testimonial')
    for index, video_url in enumerate(SEED_VIDEO_URLS):
        Testimonial.objects.update_or_create(
            video_url=video_url,
            defaults={
                'order': index,
                'is_active': True,
            },
        )


def unseed_testimonials(apps, schema_editor):
    Testimonial = apps.get_model('website', 'Testimonial')
    Testimonial.objects.filter(video_url__in=SEED_VIDEO_URLS).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0026_testimonial'),
    ]

    operations = [
        migrations.RunPython(seed_testimonials, unseed_testimonials),
    ]
