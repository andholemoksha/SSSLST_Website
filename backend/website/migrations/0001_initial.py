from django.db import migrations, models


def seed_home_stats(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    defaults = [
        {'label': 'Graduates', 'value': '2400+', 'icon': 'graduation', 'sort_order': 1, 'is_active': True},
        {'label': 'States Covered', 'value': '28', 'icon': 'location', 'sort_order': 2, 'is_active': True},
        {'label': 'Batches Completed', 'value': '12', 'icon': 'book', 'sort_order': 3, 'is_active': True},
        {'label': 'Current Participants', 'value': '340+', 'icon': 'users', 'sort_order': 4, 'is_active': True},
    ]

    for item in defaults:
        WebsiteStat.objects.get_or_create(label=item['label'], defaults=item)


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='WebsiteStat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=50)),
                ('icon', models.CharField(choices=[('graduation', 'Graduation'), ('location', 'Location'), ('book', 'Book'), ('users', 'Users')], default='graduation', max_length=32)),
                ('sort_order', models.PositiveSmallIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Website Stat',
                'verbose_name_plural': 'Website Stats',
                'ordering': ['sort_order', 'id'],
            },
        ),
        migrations.RunPython(seed_home_stats, migrations.RunPython.noop),
    ]
