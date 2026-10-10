from django.db import migrations


def seed_projects_stat(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    Project = apps.get_model('website', 'Project')
    database = schema_editor.connection.alias
    active_project_count = Project.objects.using(database).filter(is_active=True).count()

    WebsiteStat.objects.using(database).get_or_create(
        key='projects',
        defaults={
            'value': active_project_count,
            'sort_order': 5,
            'is_active': True,
        },
    )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0029_project_unique_project_title_per_year'),
        ('website', '0028_testimonial_cover_fields'),
    ]

    operations = [
        migrations.RunPython(seed_projects_stat, migrations.RunPython.noop),
    ]
