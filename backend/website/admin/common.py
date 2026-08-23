from django.contrib import admin

from website.models import WebsiteStat


@admin.register(WebsiteStat)
class WebsiteStatAdmin(admin.ModelAdmin):
    list_display = ('key', 'value', 'sort_order', 'is_active')
    list_editable = ('value', 'sort_order', 'is_active')
    readonly_fields = ('key',)
    search_fields = ('key',)
    list_filter = ('is_active',)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super().get_actions(request)
        actions.pop('delete_selected', None)
        return actions
