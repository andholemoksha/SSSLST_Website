"""Serializer for the public Projects Archive endpoint."""

from rest_framework import serializers

from website.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    # Human-readable category label (e.g. "Medical / Healthcare") alongside the
    # raw value (e.g. "medical") the frontend uses for accent-colour lookup.
    category_label = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'year',
            'state',
            'gender',
            'category',
            'category_label',
            'description',
            'document_url',
        ]
