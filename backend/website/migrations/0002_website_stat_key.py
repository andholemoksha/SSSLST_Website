from django.db import migrations, models
from django.utils.text import slugify


def populate_stat_keys(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    mapping = {
        'Graduates': 'graduates',
        'States Covered': 'states_covered',
        'Batches Completed': 'batches_completed',
        'Current Participants': 'current_participants',
    }

    for stat in WebsiteStat.objects.all():
        stat.key = mapping.get(stat.label, slugify(stat.label or stat.key or 'stat'))
        stat.save(update_fields=['key'])


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='websitestat',
            name='key',
            field=models.SlugField(blank=True, max_length=60, null=True, unique=True),
        ),
        migrations.RunPython(populate_stat_keys, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='websitestat',
            name='key',
            field=models.SlugField(help_text='Unique frontend key for the stat value', max_length=60, unique=True),
        ),
    ]
