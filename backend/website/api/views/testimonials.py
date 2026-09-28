"""Public read endpoint for video Testimonials."""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.testimonials import TestimonialSerializer
from website.services.testimonials_service import get_active_testimonials


@api_view(['GET'])
@permission_classes([AllowAny])
def get_testimonials(request):
    """Return all active testimonial videos as a bare JSON array.

    Each item is ``{ id, video_url, embed_url }``. The frontend renders a
    numbered card per item and plays ``embed_url`` in a modal on click.
    """
    testimonials = get_active_testimonials()
    data = TestimonialSerializer(testimonials, many=True).data
    return Response(data)
