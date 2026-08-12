from django.db import migrations, models


def normalize_stat_values(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    for stat in WebsiteStat.objects.all():
        raw = str(stat.value).strip()
        stat.value = int(raw.replace('+', '').replace(',', ''))
        stat.save(update_fields=['value'])


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0003_remove_stat_label_icon'),
    ]

    operations = [
        migrations.RunPython(normalize_stat_values, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='websitestat',
            name='value',
            field=models.IntegerField(),
        ),
    ]
