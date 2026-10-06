"""Serializers for the Netritvam magazine publications."""

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
            'flipbook_url',
            'cover_image',
        ]

    def get_cover_image(self, obj):
        source = obj.cover_image_source
        if not source:
            return ''
        # Backend-served uploads live under MEDIA_URL (/media/...); return them
        # as absolute URLs so the frontend can load them from this API host.
        # Bundled frontend assets (/assets/...) and full URLs are returned
        # as-is so the browser resolves them against the frontend origin.
        request = self.context.get('request')
        if source.startswith('/media/') and request is not None:
            return request.build_absolute_uri(source)
        return source
