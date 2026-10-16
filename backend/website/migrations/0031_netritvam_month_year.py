"""Rework Netritvam: replace serial_number with month + year.

Adds ``month`` and ``year`` (temporarily with defaults so existing rows apply
cleanly), removes ``serial_number`` and its unique constraint, and updates the
model ordering. The following data migration sets the real month/year/title
values per issue, and a later migration adds the unique(year, month) constraint.
"""

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0030_merge_testimonial_project_leaves'),
    ]

    operations = [
        migrations.AddField(
            model_name='netritvam',
            name='month',
            field=models.PositiveSmallIntegerField(
                default=1,
                choices=[
                    (1, 'January'), (2, 'February'), (3, 'March'), (4, 'April'),
                    (5, 'May'), (6, 'June'), (7, 'July'), (8, 'August'),
                    (9, 'September'), (10, 'October'), (11, 'November'), (12, 'December'),
                ],
                help_text='Month this issue was published.',
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='netritvam',
            name='year',
            field=models.PositiveIntegerField(
                default=2025,
                db_index=True,
                help_text='Year this issue belongs to, e.g. 2025.',
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='netritvam',
            name='title',
            field=models.CharField(
                max_length=255,
                help_text='Issue name shown on the card, e.g. "Guru Poornima Issue".',
            ),
        ),
        migrations.RemoveField(
            model_name='netritvam',
            name='serial_number',
        ),
        migrations.AlterModelOptions(
            name='netritvam',
            options={
                'ordering': ['-year', '-month', 'id'],
                'verbose_name': 'Netritvam',
                'verbose_name_plural': 'Netritvam',
            },
        ),
    ]
