"""Public read endpoint for Dhyana Vahini written reflections."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.dhyana_vahini_text import DhyanaVahiniTextSerializer
from website.services.dhyana_vahini_text_service import get_text_by_year


@api_view(['GET'])
@permission_classes([AllowAny])
def get_dhyana_vahini_text(request):
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)
    try:
        year = int(year)
    except (TypeError, ValueError):
        return Response({'error': 'year must be a valid integer'}, status=400)
    return Response(DhyanaVahiniTextSerializer(get_text_by_year(year), many=True).data)
