"""Django admin configuration for Samithi Connect video reflections."""

from django.contrib import admin

from website.models import SamithiConnectVideo


@admin.register(SamithiConnectVideo)
class SamithiConnectVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'video_id', 'published_at', 'order', 'is_active')
    list_filter = ('is_active',)
    list_editable = ('order', 'is_active')
    search_fields = ('title', 'video_id')
    ordering = ('order', 'id')
