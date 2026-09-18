#!/usr/bin/env bash
# Render START script for the Django backend (free plan, ephemeral SQLite).
# Runs at container startup. Applies migrations (which also populate baseline
# seed content via data migrations) against the SQLite database in the app
# directory, then launches gunicorn. The database is ephemeral and is rebuilt
# from seed migrations on every deploy/restart.
set -o errexit

export DJANGO_SETTINGS_MODULE="${DJANGO_SETTINGS_MODULE:-config.settings.production}"

python manage.py migrate --no-input

# Recreate the admin superuser from env vars (the DB is ephemeral on the free
# plan, so this runs on every startup). No-op if the env vars are unset.
python manage.py ensure_superuser

exec gunicorn config.wsgi:application --bind "0.0.0.0:${PORT:-10000}"
