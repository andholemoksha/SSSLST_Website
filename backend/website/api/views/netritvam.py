"""Versioned public endpoint for Netritvam publications."""

from itertools import groupby

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.netritvam import NetritvamSerializer
from website.services.netritvam_service import (
    get_active_publications,
    get_latest_publication,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_publications(request):
    """Return the latest Netritvam issue plus all issues grouped by year.

    - `latest`: the most recent issue (highest year, then serial number), shown
      as the "Latest issue" card. Computed automatically; no admin flag.
    - `groups`: every active issue grouped by year (oldest year first for the
      archive layout), with `is_current` marking the newest year (rendered
      expanded) versus older years (collapsible archive cards). Issues run 1 ->
      N within a year.
    """
    context = {'request': request}

    latest = get_latest_publication()
    latest_data = NetritvamSerializer(latest, context=context).data if latest else None

    editions = list(get_active_publications())
    grouped = {}
    for year, items in groupby(editions, key=lambda item: item.year):
        grouped[year] = list(items)

    newest_year = max(grouped) if grouped else None

    groups = []
    for year in sorted(grouped):  # ascending, for the archive layout
        groups.append({
            'year': year,
            'is_current': year == newest_year,
            'issues': NetritvamSerializer(grouped[year], many=True, context=context).data,
        })

    return Response({
        'latest': latest_data,
        'groups': groups,
    })
