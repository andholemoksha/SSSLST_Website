"""Querying services for video Testimonials."""

from website.models import Testimonial


def get_active_testimonials():
    """All active testimonials, ordered by `order` then id (Meta default)."""
    return Testimonial.objects.filter(is_active=True)
