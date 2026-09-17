"""Admin configuration for the admissions "Apply Now" card.

Shows a single "Admissions" entry in the sidebar. The admin sets the application
URL and toggles the card on/off; changes reflect on the website automatically.
"""

from django.contrib import admin

from website.models import AdmissionsSetting


@admin.register(AdmissionsSetting)
class AdmissionsSettingAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active', 'apply_url', 'updated_at')
    fieldsets = (
        (None, {
            'description': 'Turn the floating "Apply Now" card on the website on or off, '
                           'and set where it links. When OFF, the card is hidden on every page.',
            'fields': ('is_active', 'apply_url'),
        }),
        ('Card text (optional)', {
            'fields': ('headline', 'subtext'),
        }),
        ('Info', {
            'fields': ('updated_at',),
        }),
    )
    readonly_fields = ('updated_at',)

    def has_add_permission(self, request):
        # Single settings row only — created by migration; never add another.
        return not AdmissionsSetting.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def get_actions(self, request):
        actions = super().get_actions(request)
        actions.pop('delete_selected', None)
        return actions
