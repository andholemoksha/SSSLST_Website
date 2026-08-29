"""Serializers for the monthly Newsletter publications."""

from rest_framework import serializers

from website.models import Newsletter


class NewsletterSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='display_title')
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Newsletter
        fields = [
            'id',
            'title',
            'month',
            'year',
            'flipbook_url',
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
