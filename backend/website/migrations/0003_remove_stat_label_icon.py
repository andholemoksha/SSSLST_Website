from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_website_stat_key'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='websitestat',
            name='icon',
        ),
        migrations.RemoveField(
            model_name='websitestat',
            name='label',
        ),
    ]
