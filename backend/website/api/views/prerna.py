"""Public read endpoint for Prerna yearbook editions."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.prerna import PrernaEditionSerializer
from website.services.prerna_service import get_all_editions


@api_view(['GET'])
@permission_classes([AllowAny])
def prerna_editions(request):
    """Return all active Prerna editions, newest first."""
    editions = get_all_editions()
    serializer = PrernaEditionSerializer(editions, many=True, context={'request': request})
    return Response(serializer.data)
