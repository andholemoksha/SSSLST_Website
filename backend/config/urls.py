"""
URL configuration for config project.
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('website.api.urls')),
]

# Serve uploaded media files (optional cover images). On Render this is a
# single web instance serving from the persistent disk, which is acceptable for
# low-volume optional media. Primary content is served via external Drive links.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
