"""Querying services for the Netritvam magazine publications."""

from website.models import Netritvam


def get_active_issues():
    """All active issues (ordered by Meta: newest year first, then month)."""
    return Netritvam.objects.filter(is_active=True)


def get_latest_issue():
    """The most recent issue (highest year, then month), or None."""
    return (
        Netritvam.objects.filter(is_active=True)
        .order_by('-year', '-month')
        .first()
    )
