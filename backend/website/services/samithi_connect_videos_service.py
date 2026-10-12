"""Querying services for Samithi Connect video reflections."""

from website.models import SamithiConnectVideo


def get_videos_by_year(year):
    """Active Samithi Connect videos for a year (ordered by Meta: year, order, id)."""
    return SamithiConnectVideo.objects.filter(year=year, is_active=True)


def get_available_years():
    """Years that have active Samithi Connect videos, newest first."""
    years = (
        SamithiConnectVideo.objects.filter(is_active=True)
        .values_list('year', flat=True)
        .distinct()
    )
    return sorted(set(years), reverse=True)
