"""Service layer for Prerna yearbook editions."""

from website.models import PrernaEdition


def get_all_editions():
    """Return all active Prerna editions, newest first."""
    return PrernaEdition.objects.filter(is_active=True)
