"""Django admin configuration for Samithi Connect video reflections."""

from django.contrib import admin

from website.models import SamithiConnectVideo


@admin.register(SamithiConnectVideo)
class SamithiConnectVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'video_id', 'order', 'is_active')
    list_filter = ('year', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'video_id')
    ordering = ('-year', 'order')
    fieldsets = (
        (None, {
            'description': 'Paste the YouTube video id (the part after /shorts/ or '
                           'youtu.be/ in the URL, e.g. 6V7zg9Scggc).',
            'fields': ('year', 'title', 'video_id', 'order'),
        }),
        ('Details', {
            'fields': ('published_at', 'is_active'),
        }),
    )
