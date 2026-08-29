"""Serializers for public publication data."""

from rest_framework import serializers

from website.models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = [
            'title',
            'issue_number',
            'description',
            'cover_image_url',
            'publication_url',
            'published_date',
            'is_featured',
        ]
