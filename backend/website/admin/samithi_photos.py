"""Django admin for Samithi Connect activity photos.

Each entry is one activity card: pick the Wing, name the Activity, paste a Google
Drive folder link, and it syncs photos in. The public Samithi Connect page groups
these by wing automatically.
"""

from django.contrib import admin, messages
from django.http import HttpResponseRedirect
from django.urls import path, reverse
from django.utils.html import format_html

from website.models import SamithiActivity, SamithiPhoto
from website.services.samithi_photos_service import sync_activity


class SamithiPhotoInline(admin.TabularInline):
    """Read-only preview of the photos synced into this activity."""
    model = SamithiPhoto
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


@admin.register(SamithiActivity)
class SamithiActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'wing', 'photo_count', 'is_active', 'order', 'last_synced_at', 'sync_button')
    list_filter = ('wing', 'is_active')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'drive_folder_url')
    ordering = ('wing', 'order')
    readonly_fields = ('drive_folder_id', 'photo_count', 'last_synced_at', 'created_at', 'updated_at')
    inlines = (SamithiPhotoInline,)
    actions = ('sync_selected',)
    fieldsets = (
        (None, {
            'description': 'Add one entry per activity card. Pick the Wing, name the Activity '
                           '(e.g. "Vedam", "Narayan Seva", "Vidya Jyoti"). Only activities that '
                           'have photos appear on the website.',
            'fields': ('wing', 'title', 'description', 'order', 'is_active'),
        }),
        ('Photos — Google Drive folder', {
            'description': 'Paste the Drive folder link (set it to "Anyone with the link -> Viewer"). '
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

    def has_delete_permission(self, request, obj=None):
        # Deletion is disabled — untick "Is active" to hide an activity instead.
        return False

    def get_actions(self, request):
        actions = super().get_actions(request)
        actions.pop('delete_selected', None)
        return actions

    def save_model(self, request, obj, form, change):
        """Auto-sync photos from Drive when an activity with a folder link is saved."""
        super().save_model(request, obj, form, change)
        if obj.is_active and obj.drive_folder_id:
            try:
                added, updated, deactivated = sync_activity(obj)
                self.message_user(
                    request,
                    f'Synced "{obj.title}" ({obj.get_wing_display()}): +{added} added, '
                    f'~{updated} updated, -{deactivated} removed.',
                    messages.SUCCESS,
                )
            except RuntimeError as exc:
                self.message_user(request, f'Saved, but photo sync failed: {exc}', messages.WARNING)

    # ─── Per-row "Sync from Drive" button ───

    @admin.display(description='')
    def sync_button(self, obj):
        if not obj.drive_folder_id:
            return '—'
        url = reverse('admin:sync-samithi-activity', args=[obj.pk])
        return format_html(
            '<a style="display:inline-block; padding:6px 16px; background:linear-gradient(135deg, #4B1F82, #7B36A8); '
            'color:#fff; border-radius:20px; text-decoration:none; font-size:11px; font-weight:600; '
            'letter-spacing:0.5px; text-transform:uppercase;" href="{}">&#x21bb; Sync from Drive</a>',
            url,
        )

    @admin.action(description='Sync selected activities from Google Drive')
    def sync_selected(self, request, queryset):
        for activity in queryset:
            if not activity.drive_folder_id:
                self.message_user(request, f'"{activity.title}": no Drive folder link.', messages.WARNING)
                continue
            try:
                added, updated, deactivated = sync_activity(activity)
            except RuntimeError as exc:
                self.message_user(request, f'"{activity.title}": sync failed: {exc}', messages.ERROR)
                continue
            self.message_user(
                request,
                f'"{activity.title}" ({activity.get_wing_display()}): +{added} added, '
                f'~{updated} updated, -{deactivated} removed.',
                messages.SUCCESS,
            )

    def get_urls(self):
        custom = [
            path(
                '<int:activity_id>/sync/',
                self.admin_site.admin_view(self.sync_single_view),
                name='sync-samithi-activity',
            ),
        ]
        return custom + super().get_urls()

    def sync_single_view(self, request, activity_id):
        try:
            activity = SamithiActivity.objects.get(pk=activity_id)
        except SamithiActivity.DoesNotExist:
            self.message_user(request, 'Activity not found.', messages.ERROR)
            return HttpResponseRedirect(reverse('admin:website_samithiactivity_changelist'))

        try:
            added, updated, deactivated = sync_activity(activity)
            self.message_user(
                request,
                f'Synced "{activity.title}" ({activity.get_wing_display()}): +{added} added, '
                f'~{updated} updated, -{deactivated} removed.',
                messages.SUCCESS,
            )
        except RuntimeError as exc:
            self.message_user(request, f'Sync failed for "{activity.title}": {exc}', messages.ERROR)

        return HttpResponseRedirect(reverse('admin:website_samithiactivity_changelist'))
