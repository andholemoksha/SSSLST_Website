"""Public read endpoint for the Netritvam magazine publications."""

from itertools import groupby

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.netritvam import NetritvamSerializer
from website.services.netritvam_service import get_active_issues, get_latest_issue


@api_view(['GET'])
@permission_classes([AllowAny])
def get_netritvam(request):
    """Return the latest issue plus issues grouped by year.

    - `latest`: the most recent issue (highest year, then month), shown as the
      special "Latest issue" card. Computed automatically; no admin flag.
    - `groups`: every active issue grouped by year (e.g. "Netritvam 2025").
      Each group is flagged `is_current` for the newest year (rendered expanded
      on the frontend) or not (rendered as a collapsible archive card). Groups
      are ordered oldest year first; the newest (current) year is flagged and
      pulled out separately by the UI.
    """
    context = {'request': request}

    latest = get_latest_issue()
    latest_data = NetritvamSerializer(latest, context=context).data if latest else None

    # get_active_issues() orders by -year, -month (Meta). Group by year, then
    # emit years ascending; within each year, order issues January -> November
    # (month ascending) so the cards read in chronological order.
    issues = list(get_active_issues())
    grouped = {}
    for year, items in groupby(issues, key=lambda item: item.year):
        grouped[year] = list(items)

    newest_year = max(grouped) if grouped else None

    groups = []
    for year in sorted(grouped):  # ascending
        year_issues = sorted(grouped[year], key=lambda item: item.month)
        groups.append({
            'year': year,
            'is_current': year == newest_year,
            'issues': NetritvamSerializer(year_issues, many=True, context=context).data,
        })

    return Response({
        'latest': latest_data,
        'groups': groups,
    })
