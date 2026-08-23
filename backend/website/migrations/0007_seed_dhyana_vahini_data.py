"""Data migration: seed the initial 2026 Dhyana Vahini playlist and videos.

This replaces the previous seed_dhyana_vahini management command. Running
`python manage.py migrate` now populates the initial data automatically.

Further content should be managed through the admin portal.
"""

from urllib.parse import parse_qs, urlparse

from django.db import migrations


INITIAL_PLAYLIST = {
    'year': 2026,
    'playlist_url': 'https://youtube.com/playlist?list=PLqbrDbtQp9Jo4yhPwJlXGApDvo0fOWiC7&si=wze8SQr8ue64ct-j',
}

MANUAL_VIDEO_IDS = [
    'Gs8jtgJGsrw',
    'GeqDL3ZFiVo',
    'LRzbf_XeS0c',
    'YFSFZm_jzYM',
    'aqL3lHfSfzU',
    'fflpvvTS3KU',
    '9SPWl7VGPCk',
    '_tqE5XkdU7c',
    'VlGdh_yQpvs',
]


def _extract_playlist_id(url):
    return parse_qs(urlparse(url).query).get('list', [None])[0]


def seed_data(apps, schema_editor):
    DhyanaVahiniPlaylist = apps.get_model('website', 'DhyanaVahiniPlaylist')
    DhyanaVahiniVideo = apps.get_model('website', 'DhyanaVahiniVideo')

    # Playlist — set playlist_id explicitly (historical model bypasses save())
    DhyanaVahiniPlaylist.objects.update_or_create(
        year=INITIAL_PLAYLIST['year'],
        defaults={
            'playlist_url': INITIAL_PLAYLIST['playlist_url'],
            'playlist_id': _extract_playlist_id(INITIAL_PLAYLIST['playlist_url']),
            'is_active': True,
        },
    )

    # Manual video reflections
    for index, video_id in enumerate(MANUAL_VIDEO_IDS, start=1):
        DhyanaVahiniVideo.objects.update_or_create(
            video_id=video_id,
            defaults={
                'year': 2026,
                'title': f'Dhyana Vahini Video Reflection {index}',
                'order': 100 + index,
                'source': 'manual',
                'is_active': True,
            },
        )


def unseed_data(apps, schema_editor):
    DhyanaVahiniPlaylist = apps.get_model('website', 'DhyanaVahiniPlaylist')
    DhyanaVahiniVideo = apps.get_model('website', 'DhyanaVahiniVideo')

    DhyanaVahiniVideo.objects.filter(video_id__in=MANUAL_VIDEO_IDS).delete()
    DhyanaVahiniPlaylist.objects.filter(year=INITIAL_PLAYLIST['year']).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0006_dhyanavahinivideo_source'),
    ]

    operations = [
        migrations.RunPython(seed_data, unseed_data),
    ]
