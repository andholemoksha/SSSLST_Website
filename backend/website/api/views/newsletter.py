"""Public read endpoint for the monthly Newsletter publications."""

from itertools import groupby

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.newsletter import NewsletterSerializer
from website.services.newsletter_service import (
    get_active_newsletters,
    get_latest_newsletter,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_newsletters(request):
    """Return the latest edition plus editions grouped by year.

    - `latest`: the most recent edition (highest year, then month), shown as the
      special "Latest issue" card. Computed automatically; no admin flag.
    - `groups`: every active edition grouped by year. Each group is flagged
      `is_current` for the newest year (rendered expanded on the frontend) or
      not (rendered as a collapsible archive card). Months run January ->
      December within a year. Groups are ordered oldest year first so the
      frontend can lay out archive cards in ascending order; the newest
      (current) year is flagged and pulled out separately by the UI.
    """
    context = {'request': request}

    latest = get_latest_newsletter()
    latest_data = NewsletterSerializer(latest, context=context).data if latest else None

    # get_active_newsletters() orders -year, month. Group by year (desc), then
    # emit ascending so archive cards read 2026, 2027, ... on the frontend.
    editions = list(get_active_newsletters())
    grouped = {}
    for year, items in groupby(editions, key=lambda item: item.year):
        grouped[year] = list(items)

    newest_year = max(grouped) if grouped else None

    groups = []
    for year in sorted(grouped):  # ascending
        groups.append({
            'year': year,
            'is_current': year == newest_year,
            'issues': NewsletterSerializer(grouped[year], many=True, context=context).data,
        })

    return Response({
        'latest': latest_data,
        'groups': groups,
    })
