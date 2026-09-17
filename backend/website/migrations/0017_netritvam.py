# Generated for the Netritvam feature.
# Also unifies the two existing leaf migrations (newsletter + prerna) so the
# graph has a single leaf again.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0015_seed_newsletter_data'),
        ('website', '0016_prerna_cover_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Netritvam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('serial_number', models.PositiveIntegerField(db_index=True, help_text='Issue number, e.g. 1 for Netritvam-1. Higher numbers are newer.', unique=True)),
                ('title', models.CharField(blank=True, help_text='Optional custom title. Defaults to "Netritvam-<serial number>" if left blank.', max_length=255)),
                ('flipbook_url', models.URLField(help_text='HeyZine flip-book link opened when a reader clicks "Read issue".', max_length=500, unique=True)),
                ('cover_image_url', models.URLField(blank=True, help_text='Optional cover image URL shown on the card.', max_length=500)),
                ('cover_image', models.ImageField(blank=True, help_text='Optional cover image upload. Takes precedence over the cover image URL.', null=True, upload_to='netritvam/covers/')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Netritvam',
                'verbose_name_plural': 'Netritvam',
                'ordering': ['-serial_number', 'id'],
            },
        ),
    ]
