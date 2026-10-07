"""Model for leadership & service projects shown in the Projects Archive.

One row per project: a title, the year/state it belongs to, who ran it
(gender), which wing/category it falls under, a short description, and a link
to the project document. The public archive reads only active projects and
sorts them by relevance -> year desc -> state asc (see project_service).
"""

from django.db import models


class State(models.TextChoices):
    """Indian states and union territories.

    Values are the human-readable names and MUST stay in sync with the
    frontend INDIAN_STATES list (src/content/projects.js).
    """

    # States
    ANDHRA_PRADESH = 'Andhra Pradesh', 'Andhra Pradesh'
    ARUNACHAL_PRADESH = 'Arunachal Pradesh', 'Arunachal Pradesh'
    ASSAM = 'Assam', 'Assam'
    BIHAR = 'Bihar', 'Bihar'
    CHHATTISGARH = 'Chhattisgarh', 'Chhattisgarh'
    GOA = 'Goa', 'Goa'
    GUJARAT = 'Gujarat', 'Gujarat'
    HARYANA = 'Haryana', 'Haryana'
    HIMACHAL_PRADESH = 'Himachal Pradesh', 'Himachal Pradesh'
    JHARKHAND = 'Jharkhand', 'Jharkhand'
    KARNATAKA = 'Karnataka', 'Karnataka'
    KERALA = 'Kerala', 'Kerala'
    MADHYA_PRADESH = 'Madhya Pradesh', 'Madhya Pradesh'
    MAHARASHTRA = 'Maharashtra', 'Maharashtra'
    MANIPUR = 'Manipur', 'Manipur'
    MEGHALAYA = 'Meghalaya', 'Meghalaya'
    MIZORAM = 'Mizoram', 'Mizoram'
    NAGALAND = 'Nagaland', 'Nagaland'
    ODISHA = 'Odisha', 'Odisha'
    PUNJAB = 'Punjab', 'Punjab'
    RAJASTHAN = 'Rajasthan', 'Rajasthan'
    SIKKIM = 'Sikkim', 'Sikkim'
    TAMIL_NADU = 'Tamil Nadu', 'Tamil Nadu'
    TELANGANA = 'Telangana', 'Telangana'
    TRIPURA = 'Tripura', 'Tripura'
    UTTAR_PRADESH = 'Uttar Pradesh', 'Uttar Pradesh'
    UTTARAKHAND = 'Uttarakhand', 'Uttarakhand'
    WEST_BENGAL = 'West Bengal', 'West Bengal'
    # Union Territories
    ANDAMAN_NICOBAR = 'Andaman and Nicobar Islands', 'Andaman and Nicobar Islands'
    CHANDIGARH = 'Chandigarh', 'Chandigarh'
    DADRA_NAGAR_HAVELI_DAMAN_DIU = (
        'Dadra and Nagar Haveli and Daman and Diu',
        'Dadra and Nagar Haveli and Daman and Diu',
    )
    DELHI = 'Delhi', 'Delhi'
    JAMMU_KASHMIR = 'Jammu and Kashmir', 'Jammu and Kashmir'
    LADAKH = 'Ladakh', 'Ladakh'
    LAKSHADWEEP = 'Lakshadweep', 'Lakshadweep'
    PUDUCHERRY = 'Puducherry', 'Puducherry'


class Gender(models.TextChoices):
    """Who ran the project. Only two values are supported."""

    MAHILA = 'Mahila', 'Mahila'
    GENTS = 'Gents', 'Gents'


class Wing(models.TextChoices):
    """Project category / wing. Mirrors the 8 wings used across the site."""

    SPIRITUAL = 'spiritual', 'Spiritual Wing'
    SERVICE = 'service', 'Service Wing'
    EDUCATION = 'education', 'Education Wing'
    YOUTH = 'youth', 'Youth Wing'
    MEDICAL = 'medical', 'Medical / Healthcare'
    RURAL = 'rural', 'Rural Development'
    ENVIRONMENT = 'environment', 'Environment'
    OTHER = 'other', 'Other'


class Project(models.Model):
    """A single leadership/service project entry in the archive."""

    title = models.CharField(max_length=300)
    year = models.PositiveIntegerField(db_index=True)
    state = models.CharField(max_length=60, choices=State.choices, db_index=True)
    gender = models.CharField(max_length=10, choices=Gender.choices)
    category = models.CharField(
        max_length=20,
        choices=Wing.choices,
        db_index=True,
        help_text='Which wing / category this project belongs to.',
    )
    description = models.TextField(blank=True)
    document_url = models.URLField(
        max_length=600,
        help_text='Link to the project document (opened via the "View" link on the card).',
    )
    is_active = models.BooleanField(default=True, db_index=True)
    order = models.PositiveIntegerField(default=0, help_text='Lower numbers show first within the same sort tier.')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'state', 'id']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        indexes = [
            models.Index(fields=['is_active', 'year']),
            models.Index(fields=['category']),
            models.Index(fields=['state']),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=['title', 'year'],
                name='unique_project_title_per_year'),
        ]

    def __str__(self):
        return f'{self.title} ({self.state} · {self.year})'
