"""Add the unique(year, month) constraint on Netritvam.

Runs after the data migration has set distinct (year, month) pairs on every
issue, so the constraint can be added without violation.
"""

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0032_seed_netritvam_issue_details'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='netritvam',
            constraint=models.UniqueConstraint(
                fields=['year', 'month'],
                name='unique_netritvam_year_month',
            ),
        ),
    ]
