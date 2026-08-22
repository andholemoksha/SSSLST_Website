"""Synchronize Dhyana Vahini videos from active YouTube playlists."""

from django.core.management.base import BaseCommand

from website.models import DhyanaVahiniPlaylist
from website.services.dhyana_vahini_videos_service import sync_playlist


class Command(BaseCommand):
    help = 'Sync Dhyana Vahini videos from YouTube RSS feeds'

    def add_arguments(self, parser):
        parser.add_argument('--year', type=int, help='Sync only one year')

    def handle(self, *args, **options):
        playlists = DhyanaVahiniPlaylist.objects.filter(is_active=True)
        if options['year']:
            playlists = playlists.filter(year=options['year'])
        if not playlists.exists():
            self.stdout.write(self.style.WARNING('No active Dhyana Vahini playlists found.'))
            return

        totals = [0, 0, 0]
        for playlist in playlists:
            try:
                counts = sync_playlist(playlist)
            except RuntimeError as exc:
                self.stderr.write(self.style.ERROR(f'{playlist.year}: {exc}'))
                continue
            totals = [total + count for total, count in zip(totals, counts)]
            self.stdout.write(f'{playlist.year}: +{counts[0]} added, ~{counts[1]} updated, -{counts[2]} deactivated')

        self.stdout.write(self.style.SUCCESS(
            f'Done. +{totals[0]} added, ~{totals[1]} updated, -{totals[2]} deactivated.'
        ))
