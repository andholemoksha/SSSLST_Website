# Creates the AdmissionsSetting model (Apply Now card control).
# Also unifies the two existing migration leaves into a single leaf.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0017_merge_20260902_1837'),
        ('website', '0018_seed_netritvam_data'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdmissionsSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=False, help_text='When ON, the "Apply Now" card shows on every page. When OFF, it is hidden.')),
                ('apply_url', models.URLField(blank=True, help_text='The Google Form (or any) link opened when a visitor clicks "Apply Now".', max_length=500)),
                ('headline', models.CharField(blank=True, default='Admissions Open', help_text='Small heading on the card (e.g. "Admissions Open").', max_length=100)),
                ('subtext', models.CharField(blank=True, default='Applications for the upcoming batch are now open.', help_text='Short message shown on the card.', max_length=200)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Admissions',
                'verbose_name_plural': 'Admissions',
            },
        ),
    ]
