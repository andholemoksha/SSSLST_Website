#!/usr/bin/env bash
# Render BUILD script for the Django backend.
# The persistent disk is NOT mounted during the build, so this step only does
# build-safe work: install dependencies and collect static files (written to
# the app directory). Database migrations run at startup in start.sh instead,
# when the disk is mounted.
set -o errexit

# Force production settings for the build regardless of dashboard env vars.
# manage.py otherwise defaults to config.settings.development, which does not
# define STATIC_ROOT and would break collectstatic.
export DJANGO_SETTINGS_MODULE="${DJANGO_SETTINGS_MODULE:-config.settings.production}"

pip install --upgrade pip
pip install -r requirements.txt

python manage.py collectstatic --no-input
