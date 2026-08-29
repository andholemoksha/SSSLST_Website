"""Versioned public endpoint for Netritvam publications."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.publications import PublicationSerializer
from website.services.publications_service import (
    get_featured_publication,
    get_other_active_publications,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_publications(request):
    """Return the featured Netritvam issue and all remaining active issues."""
    featured_publication = get_featured_publication()
    issues = get_other_active_publications(featured_publication)
    return Response({
        'featured': (
            PublicationSerializer(featured_publication).data
            if featured_publication else None
        ),
        'issues': PublicationSerializer(issues, many=True).data,
    })
