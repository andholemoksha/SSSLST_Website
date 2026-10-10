"""Serializer for Samithi Connect video responses."""

from rest_framework import serializers

from website.models import SamithiConnectVideo


class SamithiConnectVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SamithiConnectVideo
        fields = ['video_id', 'title', 'published_at', 'order']
