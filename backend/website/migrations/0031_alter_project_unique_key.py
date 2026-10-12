from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("website", "0030_merge_testimonial_project_leaves"),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="project",
            name="unique_project_title_per_year",
        ),
        migrations.AddConstraint(
            model_name="project",
            constraint=models.UniqueConstraint(
                fields=("title", "year", "state", "gender"),
                name="unique_project_title_year_state_gender",
            ),
        ),
    ]
