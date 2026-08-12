from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.models import WebsiteStat


@api_view(['GET'])
@permission_classes([AllowAny])
def home_stats(request):
    stats = WebsiteStat.objects.filter(is_active=True).order_by('sort_order', 'id')

    if not stats.exists():
        fallback = {
            'graduates': 2400,
            'states_covered': 28,
            'batches_completed': 12,
            'current_participants': 340,
        }
        return Response(fallback)

    payload = {stat.key: stat.value for stat in stats if stat.key}
    return Response(payload)
