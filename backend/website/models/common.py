from django.db import models


class WebsiteStat(models.Model):
    key = models.SlugField(max_length=60, unique=True, help_text='Unique frontend key for the stat value')
    value = models.IntegerField()
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'Website Stat'
        verbose_name_plural = 'Website Stats'

    def __str__(self):
        return f'{self.key}: {self.value}'
