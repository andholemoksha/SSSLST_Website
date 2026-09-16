#!/usr/bin/env bash
# Render START script for the Django backend (free plan, ephemeral SQLite).
# Runs at container startup. Applies migrations (which also populate baseline
# seed content via data migrations) against the SQLite database in the app
# directory, then launches gunicorn. The database is ephemeral and is rebuilt
# from seed migrations on every deploy/restart.
set -o errexit

export DJANGO_SETTINGS_MODULE="${DJANGO_SETTINGS_MODULE:-config.settings.production}"

python manage.py migrate --no-input

exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-10000}"
