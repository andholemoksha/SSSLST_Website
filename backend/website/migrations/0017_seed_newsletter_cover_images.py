from django.db import migrations

COVER_IMAGE_URLS = {
    2: 'https://cdnm.heyzine.com/files/uploaded/f08c3400d1530145491a282a560bd744a1e7ce1d.pdf-thumb.jpg',
    3: 'https://cdnm.heyzine.com/files/uploaded/e7f1127908d9b75535868608446bfd16c6580d96.pdf-thumb.jpg',
    4: 'https://cdnm.heyzine.com/files/uploaded/4962df1b4d7e11eeccf8d2a6ee5d72999113833f.pdf-thumb.jpg',
    5: 'https://cdnm.heyzine.com/files/uploaded/44f3dda9f4c667c88a5af4ee23519c79dcb8adef.pdf-thumb.jpg',
    6: 'https://cdnm.heyzine.com/files/uploaded/d52778a885da3296f77021886e67d5eed5d17ef2.pdf-thumb.jpg',
    7: 'https://cdnm.heyzine.com/files/uploaded/88086dd96644eefcd0882e785f9b1ed03f6b5f7a.pdf-thumb.jpg',
}


def update_cover_image_urls(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    for month, cover_image_url in COVER_IMAGE_URLS.items():
        Newsletter.objects.filter(year=2026, month=month).update(
            cover_image_url=cover_image_url,
        )


def clear_cover_image_urls(apps, schema_editor):
    Newsletter = apps.get_model('website', 'Newsletter')
    Newsletter.objects.filter(year=2026, month__in=sorted(COVER_IMAGE_URLS)).update(
        cover_image_url='',
    )


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0015_seed_newsletter_data'),
        ('website', '0016_prerna_cover_image'),
    ]

    operations = [
        migrations.RunPython(update_cover_image_urls, clear_cover_image_urls),
    ]
