"""Production/deployment settings (used on Render).

Environment variables (set these in the Render dashboard):
  SECRET_KEY       - Django secret key (required)
  DEBUG            - "False" in production (defaults to False here)
  ALLOWED_HOSTS    - comma-separated hostnames, e.g. "ssslst-api.onrender.com"
  FRONTEND_URL     - the Vercel frontend origin, e.g. "https://ssslst-website-psi.vercel.app"
  SQLITE_PATH      - absolute path to the SQLite file on the persistent disk
  YOUTUBE_API_KEY  - optional, for video sync
  GOOGLE_API_KEY   - optional, for Drive gallery sync
"""

from .base import *  # noqa: F401,F403

DEBUG = config('DEBUG', default=False, cast=bool)

# Comma-separated list of allowed hosts from the environment.
# Render sets RENDER_EXTERNAL_HOSTNAME automatically; include it as a fallback.
ALLOWED_HOSTS = [
    host.strip()
    for host in config('ALLOWED_HOSTS', default='').split(',')
    if host.strip()
]
_render_host = config('RENDER_EXTERNAL_HOSTNAME', default='')
if _render_host:
    ALLOWED_HOSTS.append(_render_host)
if not ALLOWED_HOSTS:
    # Safe fallback so the service still boots; tighten via ALLOWED_HOSTS env var.
    ALLOWED_HOSTS = ['.onrender.com']

# WhiteNoise serves static files directly from the app under DEBUG=False.
# It must sit immediately after the SecurityMiddleware.
MIDDLEWARE.insert(
    MIDDLEWARE.index('django.middleware.security.SecurityMiddleware') + 1,
    'whitenoise.middleware.WhiteNoiseMiddleware',
)

STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = config('MEDIA_ROOT', default=str(BASE_DIR / 'media'))

# SQLite in the app directory (ephemeral on the free plan). Baseline content is
# repopulated by data migrations on every startup. Set SQLITE_PATH to a
# persistent-disk path if you later move to a paid plan with a disk.
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': config('SQLITE_PATH', default=str(BASE_DIR / 'db.sqlite3')),
    }
}

# CORS / CSRF: allow the Vercel frontend to call this API.
FRONTEND_URL = config('FRONTEND_URL', default='https://ssslst-website-psi.vercel.app')

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [FRONTEND_URL]

CSRF_TRUSTED_ORIGINS = [FRONTEND_URL]
if _render_host:
    CSRF_TRUSTED_ORIGINS.append(f'https://{_render_host}')

# Security headers appropriate for HTTPS behind Render's proxy.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', default=True, cast=bool)
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# HTTP Strict Transport Security. Render serves the app over HTTPS only.
SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', default=31536000, cast=int)
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
