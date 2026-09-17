"""Serializer for the admissions "Apply Now" settings."""

from rest_framework import serializers

from website.models import AdmissionsSetting


class AdmissionsSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionsSetting
        fields = ['is_active', 'apply_url', 'headline', 'subtext']
