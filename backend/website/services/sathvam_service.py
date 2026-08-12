"""Service layer for the Sathvam video endpoint.

Contains the business logic for retrieving videos by year.
"""

from website.models import SathvamVideo


def get_videos_by_year(year):
    """Return active videos for a given year, ordered by display order."""
    return SathvamVideo.objects.filter(year=year, is_active=True)


def get_available_years():
    """Return distinct years that have at least one active video."""
    return (
        SathvamVideo.objects
        .filter(is_active=True)
        .values_list('year', flat=True)
        .distinct()
        .order_by('-year')
    )
