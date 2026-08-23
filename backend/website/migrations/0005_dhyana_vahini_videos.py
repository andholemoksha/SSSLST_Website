# Generated manually because the local Python environment is missing django-cors-headers.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_alter_websitestat_value_numeric'),
    ]

    operations = [
        migrations.CreateModel(
            name='DhyanaVahiniPlaylist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.PositiveIntegerField(unique=True)),
                ('playlist_url', models.URLField(max_length=300)),
                ('playlist_id', models.CharField(editable=False, max_length=60, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('last_synced_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-year'],
                'verbose_name': 'Dhyana Vahini Playlist',
                'verbose_name_plural': 'Dhyana Vahini Playlists',
            },
        ),
        migrations.CreateModel(
            name='DhyanaVahiniVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.PositiveIntegerField(db_index=True)),
                ('video_id', models.CharField(max_length=20, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('published_at', models.DateField(blank=True, null=True)),
                ('order', models.PositiveSmallIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['year', 'order', 'id'],
                'verbose_name': 'Dhyana Vahini Video',
                'verbose_name_plural': 'Dhyana Vahini Videos',
            },
        ),
    ]
