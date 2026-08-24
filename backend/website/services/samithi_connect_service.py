"""Querying services for Samithi Connect written reflections."""

from website.models import SamithiConnectText


def get_text_by_year(year):
	return SamithiConnectText.objects.filter(year=year, is_active=True)


def get_available_text_years():
	return list(
		SamithiConnectText.objects.filter(is_active=True)
		.values_list('year', flat=True)
		.distinct()
		.order_by('-year')
	)
