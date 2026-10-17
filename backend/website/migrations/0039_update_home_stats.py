"""Update the homepage statistics values and ordering, and store Projects.

New values + order:
  1. Graduates            2600  (sort 1)
  2. States               31    (sort 2)
  3. Batches              7     (sort 3)
  4. Projects             500   (sort 4)  — now a stored stat (was computed live)
  5. Current Participants 258   (sort 5)  — kept last

`projects` used to be injected live by the stats view from the active Project
count. That logic is removed; projects is now a normal stored WebsiteStat like
the others, seeded here. The admin blocks adding rows, so it is created via this
migration. Idempotent and reversible.
"""

from django.db import migrations

# key -> (value, sort_order)
NEW_STATS = {
    'graduates': (2600, 1),
    'states_covered': (31, 2),
    'batches_completed': (7, 3),
    'current_participants': (258, 5),
}

OLD_STATS = {
    'graduates': (2400, 1),
    'states_covered': (28, 2),
    'batches_completed': (12, 3),
    'current_participants': (340, 4),
}


def forward(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    for key, (value, sort_order) in NEW_STATS.items():
        WebsiteStat.objects.filter(key=key).update(value=value, sort_order=sort_order)
    # Projects is now a stored stat (previously a live count). Create/update it.
    WebsiteStat.objects.update_or_create(
        key='projects',
        defaults={'value': 500, 'sort_order': 4, 'is_active': True},
    )


def backward(apps, schema_editor):
    WebsiteStat = apps.get_model('website', 'WebsiteStat')
    for key, (value, sort_order) in OLD_STATS.items():
        WebsiteStat.objects.filter(key=key).update(value=value, sort_order=sort_order)
    # Remove the stored projects row (it was not a stored stat before).
    WebsiteStat.objects.filter(key='projects').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0038_reset_samithi_to_three_folders'),
    ]

    operations = [
        migrations.RunPython(forward, backward),
    ]
