"""Serializers for the public Samithi Connect activity-photo endpoints."""

from rest_framework import serializers

from website.models import SamithiActivity, SamithiPhoto


class SamithiActivitySerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = SamithiActivity
        fields = ['id', 'wing', 'title', 'slug', 'description', 'photo_count', 'cover_image']

    def get_cover_image(self, obj):
        source = obj.cover_source
        if source and source.startswith('/'):
            request = self.context.get('request')
            if request is not None:
                return request.build_absolute_uri(source)
        return source


class SamithiPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SamithiPhoto
        fields = ['id', 'title', 'thumbnail_link', 'full_link', 'width', 'height']
