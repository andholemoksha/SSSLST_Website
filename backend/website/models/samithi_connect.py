"""Models for Samithi Connect written reflections."""

from django.db import models


class SamithiConnectText(models.Model):
	"""A participant's written reflection for a Samithi Connect year."""

	year = models.PositiveIntegerField(db_index=True)
	roll_number = models.CharField(max_length=50)
	name = models.CharField(max_length=255)
	reflection = models.TextField()
	is_active = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['year', 'roll_number', 'id']
		constraints = [
			models.UniqueConstraint(
				fields=['year', 'roll_number'],
				name='unique_samithi_text_year_roll_number',
			),
		]
		verbose_name = 'Samithi Connect Text Reflection'
		verbose_name_plural = 'Samithi Connect Text Reflections'

	def __str__(self):
		return f'[{self.year}] {self.name} ({self.roll_number})'
