"""Serializers for Dhyana Vahini written reflections."""

from rest_framework import serializers

from website.models import DhyanaVahiniText


class DhyanaVahiniTextSerializer(serializers.ModelSerializer):
	id = serializers.CharField(source='roll_number')

	class Meta:
		model = DhyanaVahiniText
		fields = ['id', 'name', 'reflection']
