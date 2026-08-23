"""URL routing notes for the website API endpoints.

Add the endpoint routes here with the same endpoint-based naming used in the
view modules: publications, apply, dhyana_vahini_text, dhyana_vahini_videos,
sathvam, photo_gallery, and samithi_connect.
"""

# TODO: wire the routes to the matching view functions in the views package.
from django.urls import path

from .views.health import health_check
from .views.stats import home_stats
from .views.sathvam import sathvam_videos, sathvam_years
from .views.dhyana_vahini_text import get_dhyana_vahini_text
from .views.dhyana_vahini_videos import dhyana_vahini_videos, dhyana_vahini_years

urlpatterns = [
    path('health/', health_check, name='health'),
    path('home/stats/', home_stats, name='home-stats'),
    path('sathvam/videos/', sathvam_videos, name='sathvam-videos'),
    path('sathvam/years/', sathvam_years, name='sathvam-years'),
    path('dhyana-vahini/text/', get_dhyana_vahini_text, name='dhyana-vahini-text'),
    path('dhyana-vahini/years/', dhyana_vahini_years, name='dhyana-vahini-years'),
    path('dhyana-vahini/videos/', dhyana_vahini_videos, name='dhyana-vahini-videos'),
]
