"""Querying services for public publication data."""

from website.models import Publication


def get_featured_publication():
    """Return the active featured publication, if one has been selected."""
    return Publication.objects.filter(is_active=True, is_featured=True).first()


def get_other_active_publications(featured_publication=None):
    """Return all active issues except the already-rendered featured issue."""
    publications = Publication.objects.filter(is_active=True)
    if featured_publication:
        publications = publications.exclude(pk=featured_publication.pk)
    return publications
