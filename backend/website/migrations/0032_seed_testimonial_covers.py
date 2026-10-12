"""Seed bundled cover images for the testimonial videos and fix the order gap.

The cover images are bundled with the frontend under
``/assets/testimonials/`` and their paths are stored on each testimonial's
``cover_image_url`` field (and any local admin upload on ``cover_image`` is
cleared) so the covers ship via git and show for every visitor — not just the
developer who uploaded them locally. Keyed on the stable Drive video id in
``video_url``. Also renumbers ``order`` to a contiguous 0..N sequence (a gap was
left when an earlier testimonial was removed). Idempotent.
"""

from django.db import migrations


# (drive video id, cover path served by the frontend from public/assets/testimonials/, order)
COVERS = [
    ('10Pn_AEwn26BNNFDLcWtx_ZOh8QuT0vdZ', '/assets/testimonials/testimonial-1-cover.jpg', 0),
    ('1BeTww_7segiyvCALvppZAihMUzqirh85', '/assets/testimonials/testimonial-2-cover.jpg', 1),
    ('1eEWAmn6c9nI2dubdig6AOPs9LkgYPwnZ', '/assets/testimonials/testimonial-3-cover.jpg', 2),
    ('11h9sNeu9I_ZpjNjuh-gkL9pN_S6SWTGN', '/assets/testimonials/testimonial-4-cover.jpg', 3),
    ('150gDOyDuxvtqMvUGiFawAH7jCUuDcpS7', '/assets/testimonials/testimonial-5-cover.jpg', 4),
    ('1hLl8MtLTsIlwzn2DC__QhJA7tOWF7XiC', '/assets/testimonials/testimonial-6-cover.jpg', 5),
    ('1seewP1pRZrqxP0ML0M0W9JsBjId6LYsM', '/assets/testimonials/testimonial-7-cover.jpg', 6),
    ('1aWKWa8JNtgdVI6SIYz5sRGEjjxj4kNf7', '/assets/testimonials/testimonial-8-cover.jpg', 7),
    ('1Kk5imJunRkj8AuaLOgLgBawfhrUK5S2n', '/assets/testimonials/testimonial-9-cover.jpg', 8),
]


def seed_covers(apps, schema_editor):
    Testimonial = apps.get_model('website', 'Testimonial')
    for video_id, cover, order in COVERS:
        # Match the row by its Drive video id (stable across renumbering).
        testimonial = Testimonial.objects.filter(video_url__contains=video_id).first()
        if not testimonial:
            continue
        testimonial.cover_image_url = cover
        testimonial.cover_image = ''  # drop any local-only upload so the bundled URL wins
        testimonial.order = order
        testimonial.save(update_fields=['cover_image_url', 'cover_image', 'order'])


def unseed_covers(apps, schema_editor):
    Testimonial = apps.get_model('website', 'Testimonial')
    for video_id, _cover, _order in COVERS:
        testimonial = Testimonial.objects.filter(video_url__contains=video_id).first()
        if testimonial:
            testimonial.cover_image_url = ''
            testimonial.save(update_fields=['cover_image_url'])


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0031_rename_sathvam_to_satvam_labels'),
    ]

    operations = [
        migrations.RunPython(seed_covers, unseed_covers),
    ]
