"""Serializer for the Sathvam video endpoint."""

from rest_framework import serializers

from website.models import SathvamVideo


class SathvamVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SathvamVideo
        fields = ['video_id', 'title', 'published_at', 'order']
