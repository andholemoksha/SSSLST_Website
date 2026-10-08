"""Django admin for Projects Archive entries.

State, gender and category render as dropdowns automatically from the model's
TextChoices. Admins type the year/title/description and paste the document link.
Bulk loads use the "Import CSV" button (top of the changelist) or the
`import_projects` management command — both share one validated import path.
"""

from django.contrib import admin, messages
from django.shortcuts import redirect
from django.template.response import TemplateResponse
from django.urls import path

from website.models import Project
from website.services.project_service import (
    ProjectImportError,
    import_projects_from_csv,
)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    change_list_template = 'admin/website/project/change_list.html'
    list_display = ('title', 'year', 'state', 'gender', 'category', 'is_active', 'order')
    list_filter = ('year', 'state', 'gender', 'category', 'is_active')
    list_editable = ('is_active', 'order')
    search_fields = ('title', 'description')
    ordering = ('-year', 'state', 'title')
    list_per_page = 50
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'description': 'One entry per project. Pick the state, gender and '
                           'category from the dropdowns; paste the document link. '
                           'For bulk loads use the "Import CSV" button on the list page.',
            'fields': ('title', 'year', 'state', 'gender', 'category', 'description'),
        }),
        ('Document', {
            'fields': ('document_url',),
        }),
        ('Visibility & ordering', {
            'fields': ('is_active', 'order'),
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    # ─── Custom "Import CSV" admin view ───

    def get_urls(self):
        custom = [
            path(
                'import-csv/',
                self.admin_site.admin_view(self.import_csv_view),
                name='website_project_import_csv',
            ),
        ]
        return custom + super().get_urls()

    def import_csv_view(self, request):
        error = None

        if request.method == 'POST':
            upload = request.FILES.get('file')
            dry_run = bool(request.POST.get('dry_run'))

            if upload is None:
                error = 'Please choose a CSV file.'
            else:
                try:
                    text = upload.read().decode('utf-8-sig')
                except UnicodeDecodeError:
                    error = 'CSV must be UTF-8 encoded.'

            if error is None:
                try:
                    created, updated, _ = import_projects_from_csv(text, dry_run=dry_run)
                except ProjectImportError as exc:
                    error = str(exc)
                else:
                    if dry_run:
                        self.message_user(
                            request,
                            f'Dry run OK: +{created} would be created, ~{updated} would be updated.',
                            messages.WARNING,
                        )
                    else:
                        self.message_user(
                            request,
                            f'Import complete: +{created} created, ~{updated} updated.',
                            messages.SUCCESS,
                        )
                        return redirect('admin:website_project_changelist')

        context = {
            **self.admin_site.each_context(request),
            'title': 'Import projects from CSV',
            'opts': self.model._meta,
            'error': error,
        }
        return TemplateResponse(request, 'admin/website/project/import_csv.html', context)
