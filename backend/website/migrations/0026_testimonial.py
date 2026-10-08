"""Create the Testimonial (video) model.

Depends on both 0025 cover-image seed leaves (newsletter + netritvam) so the
migration graph is unified into a single leaf here.
"""

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0025_seed_newsletter_cover_images'),
        ('website', '0025_seed_netritvam_cover_images'),
    ]

    operations = [
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video_url', models.URLField(help_text='Google Drive share link to the testimonial video, e.g. https://drive.google.com/file/d/<id>/view. The file must be shared as "Anyone with the link -> Viewer" so visitors can watch it.', max_length=500, unique=True)),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers appear first. Cards are numbered by this order.')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Testimonial',
                'verbose_name_plural': 'Testimonials',
                'ordering': ['order', 'id'],
            },
        ),
    ]
