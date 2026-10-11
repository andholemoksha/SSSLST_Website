"""Public read endpoints for Samithi Connect video reflections."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.samithi_connect_videos import SamithiConnectVideoSerializer
from website.services.samithi_connect_videos_service import (
    get_available_years,
    get_videos_by_year,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_connect_videos(request):
    """Return active Samithi Connect videos for the requested year."""
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)
    try:
        year = int(year)
    except (TypeError, ValueError):
        return Response({'error': 'year must be a valid integer'}, status=400)
    return Response(
        SamithiConnectVideoSerializer(get_videos_by_year(year), many=True).data
    )


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_connect_video_years(request):
    """Return years that contain active Samithi Connect videos."""
    return Response(list(get_available_years()))
