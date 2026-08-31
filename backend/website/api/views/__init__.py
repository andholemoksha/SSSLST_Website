"""View modules for the website API endpoints.

Each file in this package maps to one endpoint group and should contain the
request handling logic for that endpoint.
"""

from .apply import get_apply, put_apply
from .dhyana_vahini_text import get_dhyana_vahini_text
from .dhyana_vahini_videos import dhyana_vahini_videos, dhyana_vahini_years
from .photo_gallery import get_photo_gallery, post_photo_gallery
from .netritvam import get_publications
from .samithi_connect import (
	get_samithi_connect_text,
	get_samithi_connect_text_years
)
from .sathvam import sathvam_videos, sathvam_years
from .health import health_check
from .stats import home_stats
