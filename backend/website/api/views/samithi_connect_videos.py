"""Public read endpoint for Samithi Connect videos."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.samithi_connect_videos import SamithiConnectVideoSerializer
from website.services.samithi_connect_service import get_video_reflections


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_connect_videos(request):
    """Return active Samithi Connect videos in admin-configured order."""
    return Response(SamithiConnectVideoSerializer(get_video_reflections(), many=True).data)
