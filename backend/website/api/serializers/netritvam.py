"""Serializers for public Netritvam publication data."""

from rest_framework import serializers

from website.models import Netritvam


class NetritvamSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='display_title')
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Netritvam
        fields = [
            'id',
            'title',
            'serial_number',
            'year',
            'publication_url',
            'cover_image',
        ]

    def get_cover_image(self, obj):
        source = obj.cover_image_source
        if not source:
            return ''
        request = self.context.get('request')
        if source.startswith('/') and request is not None:
            return request.build_absolute_uri(source)
        return source
