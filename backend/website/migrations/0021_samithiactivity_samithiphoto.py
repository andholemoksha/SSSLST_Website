# Creates the Samithi Connect activity-photo models.
# Also unifies the two existing migration leaves into a single leaf.

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0019_fix_dhyana_vahini_text_seed'),
        ('website', '0020_seed_admissions_setting'),
    ]

    operations = [
        migrations.CreateModel(
            name='SamithiActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wing', models.CharField(choices=[('spiritual', 'Spiritual'), ('service', 'Service'), ('education', 'Education')], db_index=True, help_text='Which wing this activity belongs to.', max_length=20)),
                ('title', models.CharField(help_text='Activity name, e.g. "Vedam", "Narayan Seva", "Vidya Jyoti".', max_length=200)),
                ('slug', models.SlugField(blank=True, help_text='URL slug used by the website (auto-filled from the title if left blank).', max_length=120)),
                ('description', models.TextField(blank=True)),
                ('drive_folder_url', models.URLField(blank=True, help_text='Google Drive folder link. Set the folder to "Anyone with the link -> Viewer". Photos are pulled in automatically when you save (or click "Sync from Drive").', max_length=500)),
                ('drive_folder_id', models.CharField(blank=True, editable=False, max_length=100)),
                ('cover_image_url', models.URLField(blank=True, help_text='Optional cover image URL. If blank, the first photo is used as the cover.', max_length=600)),
                ('cover_image', models.ImageField(blank=True, help_text='Optional cover image upload. Takes precedence over the cover image URL.', null=True, upload_to='samithi/covers/')),
                ('photo_count', models.PositiveIntegerField(default=0, editable=False)),
                ('is_active', models.BooleanField(db_index=True, default=True)),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers show first within a wing.')),
                ('last_synced_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Samithi Connect Activity',
                'verbose_name_plural': 'Samithi Connect Activities',
                'ordering': ['wing', 'order', 'id'],
            },
        ),
        migrations.CreateModel(
            name='SamithiPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drive_file_id', models.CharField(max_length=100)),
                ('title', models.CharField(blank=True, max_length=300)),
                ('thumbnail_link', models.URLField(help_text='Small CDN image used in the grid.', max_length=600)),
                ('full_link', models.URLField(help_text='Larger image used in the lightbox.', max_length=600)),
                ('width', models.PositiveIntegerField(blank=True, null=True)),
                ('height', models.PositiveIntegerField(blank=True, null=True)),
                ('order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(db_index=True, default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='website.samithiactivity')),
            ],
            options={
                'verbose_name': 'Samithi Connect Photo',
                'verbose_name_plural': 'Samithi Connect Photos',
                'ordering': ['activity', 'order', 'id'],
            },
        ),
        migrations.AddConstraint(
            model_name='samithiactivity',
            constraint=models.UniqueConstraint(fields=('wing', 'title'), name='unique_samithi_activity_per_wing'),
        ),
        migrations.AddIndex(
            model_name='samithiactivity',
            index=models.Index(fields=['wing', 'is_active', 'order'], name='website_sam_wing_8f04d4_idx'),
        ),
        migrations.AddConstraint(
            model_name='samithiphoto',
            constraint=models.UniqueConstraint(fields=('activity', 'drive_file_id'), name='unique_samithi_photo_per_activity'),
        ),
        migrations.AddIndex(
            model_name='samithiphoto',
            index=models.Index(fields=['activity', 'is_active', 'order'], name='website_sam_activit_9989b9_idx'),
        ),
    ]
