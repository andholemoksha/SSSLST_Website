"""Public read endpoints for Samithi Connect activity photos.

  GET /api/samithi-connect/wings/               -> wings that have photos (+ counts, cover)
  GET /api/samithi-connect/activities/?wing=X   -> activity cards for that wing
  GET /api/samithi-connect/photos/?activity=ID  -> paginated photos for that activity

All reads come from the database (never Google Drive).
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.models import SamithiActivity
from website.api.serializers.samithi_photos import (
    SamithiActivitySerializer,
    SamithiPhotoSerializer,
)
from website.services.samithi_photos_service import (
    get_activities_for_wing,
    get_activity_counts_for_wing,
    get_active_wings,
    get_photos_for_activity,
)

VALID_WINGS = {choice.value for choice in SamithiActivity.Wing}


class SamithiPhotoPagination(PageNumberPagination):
    page_size = 24
    page_size_query_param = 'page_size'
    max_page_size = 60


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_wings(request):
    """Return wings (Spiritual/Service/Education) that contain activities with photos."""
    labels = dict(SamithiActivity.Wing.choices)
    rows = []
    for wing in get_active_wings():
        activity_count, photo_count = get_activity_counts_for_wing(wing)
        first = get_activities_for_wing(wing).first()
        cover = ''
        if first:
            cover = SamithiActivitySerializer(first, context={'request': request}).data['cover_image']
        rows.append({
            'wing': wing,
            'label': labels.get(wing, wing),
            'activity_count': activity_count,
            'photo_count': photo_count,
            'cover_image': cover,
        })
    return Response(rows)


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_activities(request):
    """Return active activity cards for the requested wing (only those with photos)."""
    wing = request.query_params.get('wing')
    if not wing:
        return Response({'error': 'wing query parameter is required'}, status=400)
    if wing not in VALID_WINGS:
        return Response({'error': 'wing must be one of: spiritual, service, education'}, status=400)

    activities = get_activities_for_wing(wing)
    return Response(SamithiActivitySerializer(activities, many=True, context={'request': request}).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_photos(request):
    """Return a page of active photos for the requested activity id."""
    activity = request.query_params.get('activity')
    if not activity:
        return Response({'error': 'activity query parameter is required'}, status=400)
    try:
        activity = int(activity)
    except (TypeError, ValueError):
        return Response({'error': 'activity must be a valid integer'}, status=400)

    photos = get_photos_for_activity(activity)
    paginator = SamithiPhotoPagination()
    page = paginator.paginate_queryset(photos, request)
    serialized = SamithiPhotoSerializer(page, many=True, context={'request': request}).data
    return paginator.get_paginated_response(serialized)
