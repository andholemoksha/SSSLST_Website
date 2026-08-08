from django.contrib import admin

from website.models import WebsiteStat


@admin.register(WebsiteStat)
class WebsiteStatAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'sort_order', 'is_active')
    list_editable = ('sort_order', 'is_active')
    search_fields = ('key',)
    list_filter = ('is_active',)
