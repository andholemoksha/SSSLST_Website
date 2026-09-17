"""Public read endpoints for the Photo Gallery.

Progressive loading, so the site stays fast under many users:
  GET /api/gallery/years/            -> list of years (+ album/photo counts, cover)
  GET /api/gallery/albums/?year=YYYY -> cards for that year (only ones with photos)
  GET /api/gallery/photos/?album=ID  -> paginated photos for that card

All reads come from our own database (never Google Drive), so responses are
small and cacheable, and no user request triggers a Google Drive API call.
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from website.api.serializers.photo_gallery import (
    GalleryAlbumSerializer,
    GalleryPhotoSerializer,
)
from website.services.photo_gallery_service import (
    get_active_years,
    get_album_counts_for_year,
    get_albums_for_year,
    get_photos_for_album,
)


class GalleryPhotoPagination(PageNumberPagination):
    """Photos are paginated so large cards never load all at once."""
    page_size = 24
    page_size_query_param = 'page_size'
    max_page_size = 60


@api_view(['GET'])
@permission_classes([AllowAny])
def gallery_years(request):
    """Return years (newest first) that contain at least one card with active photos."""
    rows = []
    for year in get_active_years():
        album_count, photo_count = get_album_counts_for_year(year)
        first_card = get_albums_for_year(year).first()
        cover = ''
        if first_card:
            cover = GalleryAlbumSerializer(first_card, context={'request': request}).data['cover_image']
        rows.append({
            'year': year,
            'album_count': album_count,
            'photo_count': photo_count,
            'cover_image': cover,
        })
    return Response(rows)


@api_view(['GET'])
@permission_classes([AllowAny])
def gallery_albums(request):
    """Return active cards for the requested year (only those that have photos)."""
    year = request.query_params.get('year')
    if not year:
        return Response({'error': 'year query parameter is required'}, status=400)
    try:
        year = int(year)
    except (TypeError, ValueError):
        return Response({'error': 'year must be a valid integer'}, status=400)

    albums = get_albums_for_year(year)
    return Response(GalleryAlbumSerializer(albums, many=True, context={'request': request}).data)


@api_view(['GET'])
@permission_classes([AllowAny])
def gallery_photos(request):
    """Return a page of active photos for the requested card id."""
    album = request.query_params.get('album')
    if not album:
        return Response({'error': 'album query parameter is required'}, status=400)
    try:
        album = int(album)
    except (TypeError, ValueError):
        return Response({'error': 'album must be a valid integer'}, status=400)

    photos = get_photos_for_album(album)
    paginator = GalleryPhotoPagination()
    page = paginator.paginate_queryset(photos, request)
    serialized = GalleryPhotoSerializer(page, many=True, context={'request': request}).data
    return paginator.get_paginated_response(serialized)


# Backwards-compatible aliases kept for the pre-existing __init__ wiring.
get_photo_gallery = gallery_years
post_photo_gallery = gallery_years
