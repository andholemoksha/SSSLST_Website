"""URL routing notes for the website API endpoints.

Add the endpoint routes here with the same endpoint-based naming used in the
view modules: publications, apply, dhyana_vahini_text, dhyana_vahini_videos,
sathvam, photo_gallery, and samithi_connect.
"""

# TODO: wire the routes to the matching view functions in the views package.
from django.urls import path

from .views.health import health_check
from .views.stats import home_stats

urlpatterns = [
    path('health/', health_check, name='health'),
    path('home/stats/', home_stats, name='home-stats'),
]
