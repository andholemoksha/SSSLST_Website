from django.urls import path

from .views.health import health_check
from .views.stats import home_stats

urlpatterns = [
    path('health/', health_check, name='health'),
    path('home/stats/', home_stats, name='home-stats'),
]
