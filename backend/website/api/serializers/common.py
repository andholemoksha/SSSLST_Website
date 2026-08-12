from rest_framework import serializers

from website.models import WebsiteStat


class WebsiteStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteStat
        fields = ['key', 'value']
