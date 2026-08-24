"""Samithi Connect API views."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.samithi_connect import SamithiConnectTextSerializer
from website.services.samithi_connect_service import get_available_text_years, get_text_by_year

@api_view(['GET'])
@permission_classes([AllowAny])
def get_samithi_connect_text(request):
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)
    try:
        year = int(year)
    except (TypeError, ValueError):
        return Response({'error': 'year must be a valid integer'}, status=400)
    return Response(SamithiConnectTextSerializer(get_text_by_year(year), many=True).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_samithi_connect_text_years(request):
    return Response(get_available_text_years())
