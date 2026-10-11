from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.models import Project, WebsiteStat


@api_view(['GET'])
@permission_classes([AllowAny])
def home_stats(request):
    stats = WebsiteStat.objects.filter(is_active=True).order_by('sort_order', 'id')

    if stats.exists():
        payload = {stat.key: stat.value for stat in stats if stat.key}
    else:
        payload = {
            'graduates': 2400,
            'states_covered': 28,
            'batches_completed': 12,
            'current_participants': 340,
        }

    # The projects count is always computed live from the archive so it stays
    # accurate as projects are added/removed — never a stale stored snapshot.
    payload['projects'] = Project.objects.filter(is_active=True).count()

    return Response(payload)
