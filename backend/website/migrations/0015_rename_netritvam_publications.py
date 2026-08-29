from django.db import migrations


NETRITVAM_ISSUES = [
    (1, 'https://heyzine.com/flip-book/3b5fb68b15.html'),
    (2, 'https://heyzine.com/flip-book/160622ba0d.html'),
    (3, 'https://heyzine.com/flip-book/f83b22df95.html'),
    (4, 'https://heyzine.com/flip-book/5734564ab1.html'),
    (5, 'https://heyzine.com/flip-book/17a32569d5.html'),
    (6, 'https://heyzine.com/flip-book/9ea1e84bf3.html'),
    (7, 'https://heyzine.com/flip-book/50ec5ecc53.html'),
]


def rename_netritvam_publications(apps, schema_editor):
    Publication = apps.get_model('website', 'Publication')
    for issue_number, publication_url in NETRITVAM_ISSUES:
        Publication.objects.filter(publication_url=publication_url).update(
            title=f'Netritvam-{issue_number}',
        )


class Migration(migrations.Migration):
    dependencies = [('website', '0014_publication')]

    operations = [migrations.RunPython(rename_netritvam_publications, migrations.RunPython.noop)]
