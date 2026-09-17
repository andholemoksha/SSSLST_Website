"""Querying services for the Netritvam magazine publications."""

from website.models import Netritvam


def get_active_issues():
    """All active issues, ordered highest serial number first (newest leads)."""
    return Netritvam.objects.filter(is_active=True)


def get_latest_issue():
    """The most recent issue (highest serial number), or None."""
    return (
        Netritvam.objects.filter(is_active=True)
        .order_by('-serial_number')
        .first()
    )
