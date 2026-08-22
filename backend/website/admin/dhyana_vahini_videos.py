"""Django admin configuration for Dhyana Vahini video management."""

from django.contrib import admin, messages

from website.models import DhyanaVahiniPlaylist, DhyanaVahiniVideo
from website.services.dhyana_vahini_videos_service import sync_playlist


@admin.register(DhyanaVahiniVideo)
class DhyanaVahiniVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'source', 'video_id', 'order', 'is_active')
    list_filter = ('year', 'source', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'video_id')
    ordering = ('-year', 'order')


@admin.register(DhyanaVahiniPlaylist)
class DhyanaVahiniPlaylistAdmin(admin.ModelAdmin):
    list_display = ('year', 'playlist_url', 'is_active', 'last_synced_at')
    list_filter = ('is_active',)
    ordering = ('-year',)
    readonly_fields = ('playlist_id', 'last_synced_at')
    fields = ('year', 'playlist_url', 'is_active', 'playlist_id', 'last_synced_at')
    actions = ('sync_selected_playlists',)

    @admin.action(description='Sync selected playlists from YouTube')
    def sync_selected_playlists(self, request, queryset):
        for playlist in queryset.filter(is_active=True):
            try:
                added, updated, deactivated = sync_playlist(playlist)
            except RuntimeError as exc:
                self.message_user(request, f'{playlist.year}: sync failed: {exc}', messages.ERROR)
                continue
            self.message_user(
                request,
                f'{playlist.year}: +{added} added, ~{updated} updated, -{deactivated} deactivated.',
                messages.SUCCESS,
            )
