"""Public read endpoint for the Netritvam magazine publications."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.netritvam import NetritvamSerializer
from website.services.netritvam_service import get_active_issues, get_latest_issue


@api_view(['GET'])
@permission_classes([AllowAny])
def get_netritvam(request):
    """Return the latest issue plus all active issues.

    - `latest`: the most recent issue (highest serial number), shown as the
      special "Latest issue" card. Computed automatically; no admin flag.
    - `issues`: every active issue ordered by serial number ascending
      (Netritvam-1, Netritvam-2, ...) for the grid below the featured card.
    """
    context = {'request': request}

    latest = get_latest_issue()
    latest_data = NetritvamSerializer(latest, context=context).data if latest else None

    issues = get_active_issues().order_by('serial_number', 'id')
    issues_data = NetritvamSerializer(issues, many=True, context=context).data

    return Response({
        'latest': latest_data,
        'issues': issues_data,
    })
