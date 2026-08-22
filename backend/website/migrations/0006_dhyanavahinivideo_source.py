from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0005_dhyana_vahini_videos'),
    ]

    operations = [
        migrations.AddField(
            model_name='dhyanavahinivideo',
            name='source',
            field=models.CharField(
                choices=[('playlist', 'YouTube playlist'), ('manual', 'Manual video link')],
                default='playlist',
                max_length=10,
            ),
        ),
    ]
