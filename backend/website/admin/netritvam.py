"""Django admin configuration for the Netritvam magazine publications."""

import re
from urllib.parse import unquote

from django import forms
from django.contrib import admin
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator

from website.models import Netritvam


class NetritvamAdminForm(forms.ModelForm):
    cover_image_url = forms.CharField(required=False, max_length=500)

    class Meta:
        model = Netritvam
        fields = '__all__'

    def clean_cover_image_url(self):
        value = self.cleaned_data['cover_image_url']
        if not value:
            return value

        if value.startswith('/'):
            decoded_path = unquote(value)
            segments = decoded_path.split('/')
            has_invalid_escape = re.search(r'%(?![0-9a-fA-F]{2})', value)
            is_valid_path = (
                value.startswith('/assets/netritvam/')
                and '?' not in value
                and '#' not in value
                and '\\' not in decoded_path
                and not any(
                    character.isspace() or ord(character) < 32
                    for character in decoded_path
                )
                and not has_invalid_escape
                and all(segment not in {'', '.', '..'} for segment in segments[1:])
            )
            if is_valid_path:
                return value
        elif not re.search(r'%(?![0-9a-fA-F]{2})', value):
            try:
                URLValidator(schemes=('http', 'https'))(value)
                return value
            except ValidationError:
                pass

        raise forms.ValidationError(
            'Enter a valid HTTP/HTTPS URL or a path beginning with /assets/netritvam/.'
        )

    def _get_validation_exclusions(self):
        # The form's clean method validates this field; the model URLField would
        # otherwise reject the approved relative paths during ModelForm validation.
        exclusions = super()._get_validation_exclusions()
        exclusions.add('cover_image_url')
        return exclusions


@admin.register(Netritvam)
class NetritvamAdmin(admin.ModelAdmin):
    form = NetritvamAdminForm
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
