"""Admin configuration for the Sathvam playlist and video models."""

from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.utils.html import format_html

from website.models import SathvamVideo, SathvamPlaylist
from website.management.commands.sync_sathvam import sync_playlist


@admin.register(SathvamVideo)
class SathvamVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'video_id', 'order', 'is_active')
    list_filter = ('year', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'video_id')
    ordering = ('-year', 'order')


@admin.register(SathvamPlaylist)
class SathvamPlaylistAdmin(admin.ModelAdmin):
    list_display = ('year', 'playlist_url', 'is_active', 'last_synced_at', 'sync_button')
    list_filter = ('is_active',)
    ordering = ('-year',)
    readonly_fields = ('last_synced_at', 'playlist_id')
    fields = ('year', 'playlist_url', 'is_active', 'last_synced_at', 'playlist_id')

    def save_model(self, request, obj, form, change):
        """Auto-sync videos from YouTube immediately when a playlist is saved."""
        super().save_model(request, obj, form, change)
        if obj.is_active:
            try:
                added, updated, deactivated = sync_playlist(obj)
                self.message_user(
                    request,
                    f'Auto-synced {obj.year}: +{added} added, ~{updated} updated, -{deactivated} deactivated.',
                    messages.SUCCESS,
                )
            except RuntimeError as e:
                self.message_user(request, f'Saved, but sync failed: {e}', messages.WARNING)

    # ─── "Sync Now" button in the list view ───

    def sync_button(self, obj):
        url = reverse('admin:sync-sathvam-playlist', args=[obj.pk])
        return format_html(
            '<a style="display:inline-block; padding:6px 16px; background:linear-gradient(135deg, #4B1F82, #7B36A8); '
            'color:#fff; border-radius:20px; text-decoration:none; font-size:11px; font-weight:600; '
            'letter-spacing:0.5px; text-transform:uppercase; box-shadow:0 2px 4px rgba(75,31,130,0.3); '
            'transition:all 0.2s;" '
            'onmouseover="this.style.boxShadow=\'0 4px 8px rgba(75,31,130,0.4)\';this.style.transform=\'translateY(-1px)\'" '
            'onmouseout="this.style.boxShadow=\'0 2px 4px rgba(75,31,130,0.3)\';this.style.transform=\'none\'" '
            'href="{}">&#x21bb; Sync Now</a>',
            url,
        )
    sync_button.short_description = ''

    # ─── Custom admin action: Sync All ───

    actions = ['sync_all_playlists']

    @admin.action(description='Sync all selected playlists from YouTube')
    def sync_all_playlists(self, request, queryset):
        total_added = 0
        total_deactivated = 0
        for playlist in queryset.filter(is_active=True):
            try:
                added, updated, deactivated = sync_playlist(playlist)
                total_added += added
                total_deactivated += deactivated
            except RuntimeError as e:
                self.message_user(request, f'Error syncing {playlist.year}: {e}', messages.ERROR)

        self.message_user(
            request,
            f'Sync complete. +{total_added} added, -{total_deactivated} deactivated.',
            messages.SUCCESS,
        )

    # ─── Custom URL for the per-row "Sync Now" button ───

    def get_urls(self):
        custom_urls = [
            path(
                '<int:playlist_id>/sync/',
                self.admin_site.admin_view(self.sync_single_view),
                name='sync-sathvam-playlist',
            ),
        ]
        return custom_urls + super().get_urls()

    def sync_single_view(self, request, playlist_id):
        """Handle the 'Sync Now' button click for a single playlist."""
        try:
            playlist = SathvamPlaylist.objects.get(pk=playlist_id)
        except SathvamPlaylist.DoesNotExist:
            self.message_user(request, 'Playlist not found.', messages.ERROR)
            return HttpResponseRedirect(reverse('admin:website_sathvamplaylist_changelist'))

        try:
            added, updated, deactivated = sync_playlist(playlist)
            self.message_user(
                request,
                f'Synced {playlist.year}: +{added} added, ~{updated} updated, -{deactivated} deactivated.',
                messages.SUCCESS,
            )
        except RuntimeError as e:
            self.message_user(request, f'Sync failed for {playlist.year}: {e}', messages.ERROR)

        return HttpResponseRedirect(reverse('admin:website_sathvamplaylist_changelist'))
