"""Querying services for public Netritvam publication data."""

from website.models import Netritvam


def get_active_publications():
    """All active issues, ordered newest year first then serial number ascending."""
    return Netritvam.objects.filter(is_active=True)


def get_latest_publication():
    """The most recent issue (highest year, then highest serial number), or None."""
    return (
        Netritvam.objects.filter(is_active=True)
        .order_by('-year', '-serial_number')
        .first()
    )
