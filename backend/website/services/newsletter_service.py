"""Querying services for the monthly Newsletter publications."""

from website.models import Newsletter


def get_active_newsletters():
    """All active editions, ordered newest year first then January -> December."""
    return Newsletter.objects.filter(is_active=True)


def get_latest_newsletter():
    """The most recent edition (highest year, then highest month), or None."""
    return (
        Newsletter.objects.filter(is_active=True)
        .order_by('-year', '-month')
        .first()
    )
