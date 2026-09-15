#!/usr/bin/env bash
# Render build script for the Django backend.
# Runs on every deploy: installs dependencies, collects static files, and
# applies migrations (which also populate baseline seed content via data
# migrations) against the SQLite database on the persistent disk.
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

# Ensure the persistent-disk directories exist (disk is mounted at /var/data).
mkdir -p /var/data/media

python manage.py collectstatic --no-input

python manage.py migrate --no-input
