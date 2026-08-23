"""Serializers for Samithi Connect written reflections."""

from rest_framework import serializers

from website.models import SamithiConnectText


class SamithiConnectTextSerializer(serializers.ModelSerializer):
	id = serializers.CharField(source='roll_number')

	class Meta:
		model = SamithiConnectText
		fields = ['id', 'name', 'reflection']
