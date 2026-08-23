"""Sathvam video endpoint views.

GET /api/sathvam/videos/?year=2026  → list of videos for that year
GET /api/sathvam/years/             → list of available years
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.sathvam import SathvamVideoSerializer
from website.services.sathvam_service import get_videos_by_year, get_available_years


@api_view(['GET'])
@permission_classes([AllowAny])
def sathvam_videos(request):
    """Return videos for a given year. Requires ?year= query param."""
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)

    try:
        year = int(year)
    except (ValueError, TypeError):
        return Response({'error': 'year must be a valid integer'}, status=400)

    videos = get_videos_by_year(year)
    serializer = SathvamVideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def sathvam_years(request):
    """Return list of years that have sathvam videos."""
    years = list(get_available_years())
    return Response(years)
