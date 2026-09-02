"""Serializer for Prerna edition responses."""

from rest_framework import serializers

from website.models import PrernaEdition


class PrernaEditionSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = PrernaEdition
        fields = ['year', 'title', 'description', 'pdf_url', 'cover_image_url']

    def get_cover_image_url(self, obj):
        """Return uploaded image URL if available, otherwise the pasted URL."""
        if obj.cover_image:
            return obj.cover_image.url
        return obj.cover_image_url or ''
