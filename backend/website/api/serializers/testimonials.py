"""Serializer for video Testimonials."""

import re

from rest_framework import serializers

from website.models import Testimonial


_DRIVE_FILE_ID_RE = re.compile(r'/file/d/([^/]+)')


def _drive_file_id(url):
    if not url:
        return ''
    match = _DRIVE_FILE_ID_RE.search(url)
    return match.group(1) if match else ''


def drive_embed_url(url):
    """Convert a Google Drive file share link into an embeddable preview URL."""
    file_id = _drive_file_id(url)
    return f'https://drive.google.com/file/d/{file_id}/preview' if file_id else (url or '')


def drive_thumbnail_url(url):
    """Best-effort auto thumbnail for a Drive file (may be empty for some videos).

    Uses the direct googleusercontent host rather than the drive.google.com
    /thumbnail endpoint, because the latter 302-redirects and often fails to
    load as a cross-origin <img> in the browser. The lh3 URL is stable and
    hotlink-friendly.
    """
    file_id = _drive_file_id(url)
    return f'https://lh3.googleusercontent.com/d/{file_id}=w640' if file_id else ''


class TestimonialSerializer(serializers.ModelSerializer):
    embed_url = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    auto_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id',
            'video_url',
            'embed_url',
            'cover_image',
            'auto_thumbnail',
        ]

    def get_embed_url(self, obj):
        return drive_embed_url(obj.video_url)

    def get_cover_image(self, obj):
        """Admin-set cover, if any. '' when none is set."""
        source = obj.cover_image_source
        if not source:
            return ''
        # Backend-served uploads (/media/...) become absolute; frontend assets
        # (/assets/...) and full URLs are returned as-is.
        request = self.context.get('request')
        if source.startswith('/media/') and request is not None:
            return request.build_absolute_uri(source)
        return source

    def get_auto_thumbnail(self, obj):
        """Best-effort Drive thumbnail, used only if no admin cover is set."""
        return drive_thumbnail_url(obj.video_url)
