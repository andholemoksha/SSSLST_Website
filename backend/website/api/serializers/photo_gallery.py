"""Serializers for the public Photo Gallery endpoints."""

from rest_framework import serializers

from website.models import GalleryAlbum, GalleryPhoto


class GalleryAlbumSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryAlbum
        fields = ['id', 'year', 'title', 'description', 'photo_count', 'cover_image']

    def get_cover_image(self, obj):
        source = obj.cover_source
        if source and source.startswith('/'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(source)
        return source


class GalleryPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryPhoto
        fields = ['id', 'title', 'thumbnail_link', 'full_link', 'width', 'height']
