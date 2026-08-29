from django.db import migrations, models
import django.db.models


NETRITVAM_ISSUES = [
    (1, 'https://heyzine.com/flip-book/3b5fb68b15.html'),
    (2, 'https://heyzine.com/flip-book/160622ba0d.html'),
    (3, 'https://heyzine.com/flip-book/f83b22df95.html'),
    (4, 'https://heyzine.com/flip-book/5734564ab1.html'),
    (5, 'https://heyzine.com/flip-book/17a32569d5.html'),
    (6, 'https://heyzine.com/flip-book/9ea1e84bf3.html'),
    (7, 'https://heyzine.com/flip-book/50ec5ecc53.html'),
]


def seed_netritvam_issues(apps, schema_editor):
    Publication = apps.get_model('website', 'Publication')
    for issue_number, publication_url in NETRITVAM_ISSUES:
        Publication.objects.update_or_create(
            issue_number=issue_number,
            defaults={
                'title': f'Netritvam-{issue_number}',
                'publication_url': publication_url,
                'is_featured': issue_number == 7,
                'is_active': True,
            },
        )


def unseed_netritvam_issues(apps, schema_editor):
    Publication = apps.get_model('website', 'Publication')
    Publication.objects.filter(
        publication_url__in=[url for _, url in NETRITVAM_ISSUES],
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0013_merge_20260824_1354'),
    ]

    operations = [
        migrations.CreateModel(
            name='Publication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('issue_number', models.PositiveSmallIntegerField(unique=True)),
                ('description', models.TextField(blank=True)),
                ('cover_image_url', models.URLField(blank=True, max_length=500)),
                ('publication_url', models.URLField(max_length=500, unique=True)),
                ('published_date', models.DateField(blank=True, null=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Publication',
                'verbose_name_plural': 'Publications',
                'ordering': ['-issue_number', '-published_date', '-id'],
            },
        ),
        migrations.AddConstraint(
            model_name='publication',
            constraint=models.UniqueConstraint(
                condition=models.Q(('is_active', True), ('is_featured', True)),
                fields=('is_featured',),
                name='one_active_featured_publication',
            ),
        ),
        migrations.RunPython(seed_netritvam_issues, unseed_netritvam_issues),
    ]
