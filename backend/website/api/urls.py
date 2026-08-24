"""URL routing for the website API endpoints."""

from django.urls import path

from .views.health import health_check
from .views.stats import home_stats
from .views.dhyana_vahini_videos import dhyana_vahini_videos, dhyana_vahini_years
from .views.sathvam import sathvam_videos, sathvam_years
from .views.dhyana_vahini_text import get_dhyana_vahini_text

urlpatterns = [
    path('health/', health_check, name='health'),
    path('home/stats/', home_stats, name='home-stats'),
    path('dhyana-vahini/years/', dhyana_vahini_years, name='dhyana-vahini-years'),
    path('dhyana-vahini/videos/', dhyana_vahini_videos, name='dhyana-vahini-videos'),
    path('dhyana-vahini/text/', get_dhyana_vahini_text, name='dhyana-vahini-text'),
    path('sathvam/videos/', sathvam_videos, name='sathvam-videos'),
    path('sathvam/years/', sathvam_years, name='sathvam-years'),
]
