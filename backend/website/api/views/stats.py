from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.models import WebsiteStat


@api_view(['GET'])
@permission_classes([AllowAny])
def home_stats(request):
    stats = WebsiteStat.objects.filter(is_active=True).order_by('sort_order', 'id')

    if stats.exists():
        payload = {stat.key: stat.value for stat in stats if stat.key}
    else:
        payload = {
            'graduates': 2600,
            'states_covered': 31,
            'batches_completed': 7,
            'projects': 500,
            'current_participants': 258,
        }

    return Response(payload)
