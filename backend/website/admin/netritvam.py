"""Django Admin configuration for Netritvam publications."""

from django.contrib import admin

from website.models import Netritvam


@admin.register(Netritvam)
class NetritvamAdmin(admin.ModelAdmin):
    list_display = ('display_title', 'serial_number', 'year', 'is_active', 'updated_at')
    list_filter = ('year', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('title', 'publication_url')
    ordering = ('-year', 'serial_number')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('serial_number', 'year', 'title', 'publication_url'),
        }),
        ('Cover image (optional)', {
            'description': 'Provide a cover image by uploading a file or pasting an image URL. '
                           'An uploaded file takes precedence over the URL.',
            'fields': ('cover_image', 'cover_image_url'),
        }),
        ('Visibility', {
            'fields': ('is_active',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

    @admin.display(description='Title')
    def display_title(self, obj):
        return obj.display_title
