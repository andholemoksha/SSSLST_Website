"""Django Admin configuration for publications."""

from django.contrib import admin

from website.models import Publication


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'issue_number',
        'published_date',
        'is_featured',
        'is_active',
        'updated_at',
    )
    list_filter = ('is_featured', 'is_active', 'published_date')
    list_editable = ('is_featured', 'is_active')
    search_fields = ('title', 'description')
    ordering = ('-issue_number',)
    readonly_fields = ('created_at', 'updated_at')
    fields = (
        'title',
        'issue_number',
        'description',
        'cover_image_url',
        'publication_url',
        'published_date',
        'is_featured',
        'is_active',
        'created_at',
        'updated_at',
    )
