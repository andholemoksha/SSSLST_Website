"""Django admin configuration for the Netritvam magazine publications."""

from django.contrib import admin

from website.models import Netritvam


@admin.register(Netritvam)
class NetritvamAdmin(admin.ModelAdmin):
    list_display = ('display_title', 'serial_number', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    list_editable = ('is_active',)
    search_fields = ('title', 'flipbook_url')
    ordering = ('-serial_number',)
    fieldsets = (
        (None, {
            'fields': ('serial_number', 'title', 'flipbook_url'),
        }),
        ('Cover image (optional)', {
            'description': 'Provide a cover image by uploading a file or pasting an image URL. '
                           'An uploaded file takes precedence over the URL.',
            'fields': ('cover_image', 'cover_image_url'),
        }),
        ('Visibility', {
            'fields': ('is_active',),
        }),
    )

    @admin.display(description='Title')
    def display_title(self, obj):
        return obj.display_title
