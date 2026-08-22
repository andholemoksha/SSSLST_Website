"""Serializers for Dhyana Vahini video responses."""

from rest_framework import serializers

from website.models import DhyanaVahiniVideo


class DhyanaVahiniVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DhyanaVahiniVideo
        fields = ['video_id', 'title', 'published_at', 'order']
