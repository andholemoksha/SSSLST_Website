"""Public read endpoint for the Samithi Connect photo carousel.

  GET /api/samithi-connect/photos/  -> one image per active activity, tagged by wing

All reads come from the database (never Google Drive).
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.services.samithi_photos_service import get_carousel_images


@api_view(['GET'])
@permission_classes([AllowAny])
def samithi_photos(request):
    """Return one image per active activity, tagged by wing, for the carousel.

    Shape: ``[{ "wing": "spiritual", "title": "Vedam", "image": "https://..." }]``
    Local/relative image paths are turned into absolute URLs; external CDN
    links (Google Drive thumbnails) are returned unchanged.
    """
    items = get_carousel_images()
    for item in items:
        image = item.get('image') or ''
        if image.startswith('/'):
            item['image'] = request.build_absolute_uri(image)
    return Response(items)
