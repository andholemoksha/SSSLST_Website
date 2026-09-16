"""Create or update a Django superuser from environment variables.

Intended for deployments with an ephemeral database (e.g. Render free plan),
where the superuser must be recreated on every startup. Idempotent: safe to run
on every deploy. Reads credentials from environment variables so no secrets are
committed to the repo.

Environment variables:
  DJANGO_SUPERUSER_USERNAME  (required)
  DJANGO_SUPERUSER_PASSWORD  (required)
  DJANGO_SUPERUSER_EMAIL     (optional)

If username or password is not set, the command exits quietly without error so
local development is unaffected.
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create or update a superuser from DJANGO_SUPERUSER_* environment variables'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', '')

        if not username or not password:
            self.stdout.write(
                'DJANGO_SUPERUSER_USERNAME/PASSWORD not set; skipping superuser creation.'
            )
            return

        User = get_user_model()
        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email},
        )

        user.email = email or user.email
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(password)
        user.save()

        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} superuser "{username}".'))
