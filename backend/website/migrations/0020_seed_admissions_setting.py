"""Create the single AdmissionsSetting row (inactive by default).

So the "Apply Now" card stays hidden until an admin sets the URL and toggles it
on. Idempotent: re-running never creates a second row (singleton pk=1)."""

from django.db import migrations


def seed_admissions(apps, schema_editor):
    AdmissionsSetting = apps.get_model('website', 'AdmissionsSetting')
    AdmissionsSetting.objects.update_or_create(
        pk=1,
        defaults={
            'is_active': False,
            'apply_url': '',
            'headline': 'Admissions Open',
            'subtext': 'Applications for the upcoming batch are now open.',
        },
    )


def unseed_admissions(apps, schema_editor):
    AdmissionsSetting = apps.get_model('website', 'AdmissionsSetting')
    AdmissionsSetting.objects.filter(pk=1).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0019_admissionssetting'),
    ]

    operations = [
        migrations.RunPython(seed_admissions, unseed_admissions),
    ]
