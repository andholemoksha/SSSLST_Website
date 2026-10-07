"""Public read endpoint for the Projects Archive.

  GET /api/projects/
      ?search=<text>
      &year=<int>        (repeatable)
      &state=<name>      (repeatable)
      &gender=<Mahila|Gents>  (repeatable)
      &category=<wing>   (repeatable)
      &page=<int>&page_size=<int>

Returns a paginated list (DRF default shape: count / next / previous / results),
sorted by relevance (when searching) -> year desc -> state asc.
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.projects import ProjectSerializer
from website.services.project_service import search_projects


class ProjectPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 60


def _int_list(values):
    """Keep only the values that parse as ints (ignore junk gracefully)."""
    result = []
    for value in values:
        try:
            result.append(int(value))
        except (TypeError, ValueError):
            continue
    return result


@api_view(['GET'])
@permission_classes([AllowAny])
def projects(request):
    """Return a page of active projects matching the given filters/search."""
    params = request.query_params

    search = params.get('search')
    years = _int_list(params.getlist('year'))
    states = params.getlist('state')
    genders = params.getlist('gender')
    categories = params.getlist('category')

    queryset = search_projects(
        search=search,
        year=years,
        state=states,
        gender=genders,
        category=categories,
    )

    paginator = ProjectPagination()
    page = paginator.paginate_queryset(queryset, request)
    serialized = ProjectSerializer(page, many=True, context={'request': request}).data
    return paginator.get_paginated_response(serialized)
