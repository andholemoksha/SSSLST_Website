#!/usr/bin/env bash
# Render START script for the Django backend.
# Runs at container startup, when the persistent disk IS mounted. Creates the
# disk directories, applies migrations (which also populate baseline seed
# content via data migrations), then launches gunicorn.
set -o errexit

export DJANGO_SETTINGS_MODULE="${DJANGO_SETTINGS_MODULE:-config.settings.production}"
export SQLITE_PATH="${SQLITE_PATH:-/var/data/db.sqlite3}"
export MEDIA_ROOT="${MEDIA_ROOT:-/var/data/media}"

# The persistent disk is mounted at runtime; ensure the directories exist.
mkdir -p "$(dirname "$SQLITE_PATH")"
mkdir -p "$MEDIA_ROOT"

python manage.py migrate --no-input

exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-10000}"
