"""Django admin configuration for Samithi Connect text reflections."""

import csv
import io

from django.contrib import admin
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.db import transaction
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import path, reverse

from website.models import SamithiConnectText


@admin.register(SamithiConnectText)
class SamithiConnectTextAdmin(admin.ModelAdmin):
	change_list_template = 'admin/website/samithiconnecttext/change_list.html'
	list_display = ('name', 'roll_number', 'year', 'is_active', 'updated_at')
	list_filter = ('year', 'is_active')
	list_editable = ('is_active',)
	search_fields = ('name', 'roll_number', 'reflection')
	ordering = ('-year', 'roll_number')

	def get_urls(self):
		custom_urls = [
			path(
				'import-csv/',
				self.admin_site.admin_view(self.import_csv_view),
				name='website_samithiconnecttext_import_csv',
			),
		]
		return custom_urls + super().get_urls()

	def import_csv_view(self, request):
		if request.method == 'POST':
			try:
				year = int(request.POST.get('year', ''))
			except ValueError:
				return self._render_import(request, 'Enter a valid year.')

			upload = request.FILES.get('file')
			if not upload:
				return self._render_import(request, 'Choose a CSV file to import.', year)
			try:
				rows = self._parse_csv(upload)
			except (UnicodeDecodeError, ValidationError) as exc:
				return self._render_import(request, str(exc), year)

			row_ids = [row['id'] for row in rows]
			if len(row_ids) != len(set(row_ids)):
				return self._render_import(request, 'The CSV contains duplicate id values.', year)

			existing = {
				item.roll_number: item
				for item in SamithiConnectText.objects.filter(year=year)
			}
			missing = set(existing) - set(row_ids)
			with transaction.atomic():
				for row in rows:
					SamithiConnectText.objects.update_or_create(
						year=year,
						roll_number=row['id'],
						defaults={
							'name': row['name'],
							'reflection': row['reflection'],
							'is_active': True,
						},
					)
				if request.POST.get('complete') and missing:
					SamithiConnectText.objects.filter(
						year=year,
						roll_number__in=missing,
					).update(is_active=False)

			self.message_user(
				request,
				f'Imported {len(rows)} Samithi Connect reflection(s) for {year}.',
				messages.SUCCESS,
			)
			return HttpResponseRedirect(reverse('admin:website_samithiconnecttext_changelist'))

		return self._render_import(request)

	def _parse_csv(self, upload):
		content = upload.read().decode('utf-8-sig')
		reader = csv.DictReader(io.StringIO(content))
		required = {'id', 'name', 'reflection'}
		if not reader.fieldnames or not required.issubset(reader.fieldnames):
			raise ValidationError('CSV must contain id,name,reflection columns.')
		rows = []
		for line_number, row in enumerate(reader, start=2):
			values = {field: (row.get(field) or '').strip() for field in required}
			if not all(values.values()):
				raise ValidationError(f'Row {line_number} has an empty required field.')
			rows.append(values)
		return rows

	def _render_import(self, request, error='', year=''):
		return render(request, 'admin/website/samithiconnecttext/import_csv.html', {
			'opts': self.model._meta,
			'error': error,
			'year': year,
		})
