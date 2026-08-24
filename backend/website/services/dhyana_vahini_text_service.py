"""Querying services for Dhyana Vahini written reflections."""

from website.models import DhyanaVahiniText


def get_text_by_year(year):
	return DhyanaVahiniText.objects.filter(year=year, is_active=True)
