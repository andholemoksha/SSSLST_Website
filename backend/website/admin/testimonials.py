"""Django admin configuration for video Testimonials."""

from django.contrib import admin

from website.models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'video_url', 'order', 'is_active', 'updated_at')
    list_filter = ('is_active',)
    list_editable = ('order', 'is_active')
    search_fields = ('video_url',)
    ordering = ('order', 'id')
    fieldsets = (
        (None, {
            'description': 'Paste a Google Drive share link to the testimonial '
                           'video. The file must be shared as "Anyone with the '
                           'link -> Viewer" so visitors can watch it.',
            'fields': ('video_url', 'order'),
        }),
        ('Cover image (optional)', {
            'description': 'Provide a cover photo by uploading a file or pasting '
                           'an image URL. An uploaded file takes precedence. If '
                           'neither is set, a thumbnail is auto-derived from the '
                           'Drive video (best effort).',
            'fields': ('cover_image', 'cover_image_url'),
        }),
        ('Visibility', {
            'fields': ('is_active',),
        }),
    )
