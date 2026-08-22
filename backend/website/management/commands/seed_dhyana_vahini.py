"""Create the initial 2026 Dhyana Vahini playlist record."""

from django.core.management.base import BaseCommand

from website.models import DhyanaVahiniPlaylist, DhyanaVahiniVideo


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


class Command(BaseCommand):
    help = 'Create the initial 2026 Dhyana Vahini YouTube playlist'

    def handle(self, *args, **options):
        playlist, created = DhyanaVahiniPlaylist.objects.update_or_create(
            year=INITIAL_PLAYLIST['year'],
            defaults={'playlist_url': INITIAL_PLAYLIST['playlist_url'], 'is_active': True},
        )
        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} Dhyana Vahini playlist for {playlist.year}.'))

        for index, video_id in enumerate(MANUAL_VIDEO_IDS, start=1):
            DhyanaVahiniVideo.objects.update_or_create(
                video_id=video_id,
                defaults={
                    'year': 2026,
                    'title': f'Dhyana Vahini Video Reflection {index}',
                    'order': 100 + index,
                    'source': DhyanaVahiniVideo.Source.MANUAL,
                    'is_active': True,
                },
            )
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(MANUAL_VIDEO_IDS)} manual Dhyana Vahini video reflections.'))
