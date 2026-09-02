"""Admin configuration for Prerna yearbook editions."""

from django.contrib import admin

from website.models import PrernaEdition


@admin.register(PrernaEdition)
class PrernaEditionAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'is_active')
    list_filter = ('is_active',)
    list_editable = ('is_active',)
    ordering = ('-year',)
    search_fields = ('title',)
    fields = ('year', 'title', 'pdf_url', 'cover_image', 'cover_image_url', 'is_active')
