"""Serializer modules for the website API endpoints.

Each serializer module should validate the payload for its matching endpoint.
"""

from .apply import *
from .dhyana_vahini_text import *
from .dhyana_vahini_videos import *
from .newsletter import NewsletterSerializer
from .photo_gallery import *
from .publications import *
from .samithi_connect import *
from .sathvam import *
from .common import WebsiteStatSerializer
