#!/usr/bin/env bash
# Render build script for the Django backend.
# Runs on every deploy: installs dependencies, collects static files, and
# applies migrations (which also populate baseline seed content via data
# migrations) against the SQLite database on the persistent disk.
set -o errexit

# Force production settings for the build regardless of dashboard env vars.
# manage.py otherwise defaults to config.settings.development, which does not
# define STATIC_ROOT and would break collectstatic.
export DJANGO_SETTINGS_MODULE="${DJANGO_SETTINGS_MODULE:-config.settings.production}"

# Provide safe defaults for the persistent-disk paths so the build works even
# before the disk env vars are applied. The mounted disk lives at /var/data.
export SQLITE_PATH="${SQLITE_PATH:-/var/data/db.sqlite3}"
export MEDIA_ROOT="${MEDIA_ROOT:-/var/data/media}"

pip install --upgrade pip
pip install -r requirements.txt

# Ensure the persistent-disk directories exist (disk is mounted at /var/data).
mkdir -p "$(dirname "$SQLITE_PATH")"
mkdir -p "$MEDIA_ROOT"

python manage.py collectstatic --no-input

python manage.py migrate --no-input
