"""Django admin for the Photo Gallery — a SINGLE "Photo Gallery" section.

Each entry is one card: year + title + Google Drive folder link (+ optional
cover). Save auto-syncs photos from the Drive folder; the public site groups the
cards by year automatically. The admin never manages years or photos separately.
"""

from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.utils.html import format_html

from website.models import GalleryAlbum, GalleryPhoto
from website.services.photo_gallery_service import sync_album


class GalleryPhotoInline(admin.TabularInline):
    """Read-only preview of the photos synced into this card."""
    model = GalleryPhoto
    extra = 0
    fields = ('thumbnail_preview', 'title', 'order', 'is_active')
    readonly_fields = ('thumbnail_preview',)
    ordering = ('order', 'id')
    can_delete = False

    @admin.display(description='Preview')
    def thumbnail_preview(self, obj):
        if obj.thumbnail_link:
            return format_html(
                '<img src="{}" style="height:56px;width:auto;border-radius:6px;" loading="lazy" />',
                obj.thumbnail_link,
            )
        return '—'

    def has_add_permission(self, request, obj=None):
        # Photos are populated via "Sync from Drive", not added by hand.
        return False


@admin.register(GalleryAlbum)
class PhotoGalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'photo_count', 'is_active', 'order', 'last_synced_at', 'sync_button')
    list_filter = ('year', 'is_active')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'drive_folder_url')
    ordering = ('-year', 'order')
    readonly_fields = ('drive_folder_id', 'photo_count', 'last_synced_at', 'created_at', 'updated_at')
    inlines = (GalleryPhotoInline,)
    actions = ('sync_selected',)

    def has_delete_permission(self, request, obj=None):
        # Deletion is disabled — untick "Is active" to hide a card instead.
        return False

    def get_actions(self, request):
        # Drop the built-in "Delete selected" bulk action.
        actions = super().get_actions(request)
        actions.pop('delete_selected', None)
        return actions
    fieldsets = (
        (None, {
            'description': 'Add one entry per card. Example: (2025, "Induction"), '
                           '(2025, "Valedictory"), (2026, "Sai Hira"). Only cards that '
                           'have photos appear on the website.',
            'fields': ('year', 'title', 'description', 'order', 'is_active'),
        }),
        ('Photos — Google Drive folder', {
            'description': 'Paste the Drive folder link (set it to "Anyone with the link → Viewer"). '
                           'Photos are pulled in automatically when you save.',
            'fields': ('drive_folder_url', 'drive_folder_id', 'photo_count', 'last_synced_at'),
        }),
        ('Cover image (optional)', {
            'description': 'Upload a file or paste a URL. If blank, the first photo is used as the cover.',
            'fields': ('cover_image', 'cover_image_url'),
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    def save_model(self, request, obj, form, change):
        """Auto-sync photos from Drive when a card with a folder link is saved."""
        super().save_model(request, obj, form, change)
        if obj.is_active and obj.drive_folder_id:
            try:
                added, updated, deactivated = sync_album(obj)
                self.message_user(
                    request,
                    f'Synced "{obj.title}" ({obj.year}): +{added} added, ~{updated} updated, '
                    f'-{deactivated} removed.',
                    messages.SUCCESS,
                )
            except RuntimeError as exc:
                self.message_user(request, f'Saved, but photo sync failed: {exc}', messages.WARNING)

    # ─── Per-row "Sync from Drive" button ───

    @admin.display(description='')
    def sync_button(self, obj):
        if not obj.drive_folder_id:
            return '—'
        url = reverse('admin:sync-gallery-album', args=[obj.pk])
        return format_html(
            '<a style="display:inline-block; padding:6px 16px; background:linear-gradient(135deg, #4B1F82, #7B36A8); '
            'color:#fff; border-radius:20px; text-decoration:none; font-size:11px; font-weight:600; '
            'letter-spacing:0.5px; text-transform:uppercase;" href="{}">&#x21bb; Sync from Drive</a>',
            url,
        )

    @admin.action(description='Sync selected cards from Google Drive')
    def sync_selected(self, request, queryset):
        for album in queryset:
            if not album.drive_folder_id:
                self.message_user(request, f'"{album.title}": no Drive folder link.', messages.WARNING)
                continue
            try:
                added, updated, deactivated = sync_album(album)
            except RuntimeError as exc:
                self.message_user(request, f'"{album.title}": sync failed: {exc}', messages.ERROR)
                continue
            self.message_user(
                request,
                f'"{album.title}" ({album.year}): +{added} added, ~{updated} updated, -{deactivated} removed.',
                messages.SUCCESS,
            )

    def get_urls(self):
        custom = [
            path(
                '<int:album_id>/sync/',
                self.admin_site.admin_view(self.sync_single_view),
                name='sync-gallery-album',
            ),
        ]
        return custom + super().get_urls()

    def sync_single_view(self, request, album_id):
        try:
            album = GalleryAlbum.objects.get(pk=album_id)
        except GalleryAlbum.DoesNotExist:
            self.message_user(request, 'Card not found.', messages.ERROR)
            return HttpResponseRedirect(reverse('admin:website_galleryalbum_changelist'))

        try:
            added, updated, deactivated = sync_album(album)
            self.message_user(
                request,
                f'Synced "{album.title}" ({album.year}): +{added} added, ~{updated} updated, '
                f'-{deactivated} removed.',
                messages.SUCCESS,
            )
        except RuntimeError as exc:
            self.message_user(request, f'Sync failed for "{album.title}": {exc}', messages.ERROR)

        return HttpResponseRedirect(reverse('admin:website_galleryalbum_changelist'))
