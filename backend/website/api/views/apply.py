"""Public read endpoint for the admissions "Apply Now" card settings.

The card is managed from the Django admin (Website → Admissions). This endpoint
just exposes the single settings row so the frontend can decide whether to show
the card and where it links.
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.apply import AdmissionsSettingSerializer
from website.models import AdmissionsSetting


@api_view(['GET'])
@permission_classes([AllowAny])
def get_apply(request):
    """Return the admissions settings (is_active, apply_url, headline, subtext)."""
    setting = AdmissionsSetting.objects.first()
    if setting is None:
        return Response({
            'is_active': False,
            'apply_url': '',
            'headline': 'Admissions Open',
            'subtext': 'Applications for the upcoming batch are now open.',
        })
    return Response(AdmissionsSettingSerializer(setting).data)


# Editing happens through the Django admin, not the API. Kept for the existing
# __init__ import wiring; it is intentionally not routed as a writable endpoint.
def put_apply(request):  # pragma: no cover
    """Not exposed — admissions settings are edited via the Django admin."""
    return None
