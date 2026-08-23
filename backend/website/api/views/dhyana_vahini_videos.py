"""Public read endpoints for Dhyana Vahini videos."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.dhyana_vahini_videos import DhyanaVahiniVideoSerializer
from website.services.dhyana_vahini_videos_service import get_available_years, get_videos_by_year


@api_view(['GET'])
@permission_classes([AllowAny])
def dhyana_vahini_videos(request):
    """Return active videos for the requested year."""
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)
    try:
        year = int(year)
    except (TypeError, ValueError):
        return Response({'error': 'year must be a valid integer'}, status=400)
    return Response(DhyanaVahiniVideoSerializer(get_videos_by_year(year), many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def dhyana_vahini_years(request):
    """Return years containing active Dhyana Vahini videos."""
    return Response(list(get_available_years()))
