"""Querying service for Samithi Connect video reflections."""

from website.models import SamithiConnectVideo


def get_videos():
    return SamithiConnectVideo.objects.filter(is_active=True)
