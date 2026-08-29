"""Version 1 public API routes."""

from django.urls import path

from .views.publications import get_publications


urlpatterns = [
    path('publications/', get_publications, name='v1-publications'),
]
