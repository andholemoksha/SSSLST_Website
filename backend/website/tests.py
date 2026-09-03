from django.test import SimpleTestCase, TestCase

from website.models import (
    DhyanaVahiniText,
    DhyanaVahiniVideo,
    GalleryAlbum,
    GalleryPhoto,
    Newsletter,
    Netritvam,
)
from website.models.photo_gallery import extract_drive_folder_id


class HealthEndpointTests(SimpleTestCase):
    def test_health_endpoint(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')


class HomeStatsEndpointTests(TestCase):
    def test_home_stats_endpoint_returns_cms_data(self):
        response = self.client.get('/api/home/stats/')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIsInstance(payload, dict)
        self.assertEqual(payload['graduates'], 2400)
        self.assertEqual(payload['states_covered'], 28)
        self.assertEqual(payload['batches_completed'], 12)
        self.assertEqual(payload['current_participants'], 340)
        self.assertNotIn('label', str(payload))
        self.assertNotIn('icon', str(payload))


class DhyanaVahiniVideoEndpointTests(TestCase):
    def setUp(self):
        DhyanaVahiniVideo.objects.create(
            year=2026,
            video_id='first-video',
            title='First Dhyana Vahini Video',
            order=1,
        )
        DhyanaVahiniVideo.objects.create(
            year=2026,
            video_id='hidden-video',
            title='Hidden Dhyana Vahini Video',
            order=2,
            is_active=False,
        )

    def test_years_lists_active_video_and_text_years(self):
        DhyanaVahiniText.objects.create(
            year=2025,
            roll_number='text-only-001',
            name='Text Only Student',
            reflection='A text-only year.',
        )
        response = self.client.get('/api/dhyana-vahini/years/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [2026, 2025])

    def test_videos_filters_to_active_records_for_the_requested_year(self):
        response = self.client.get('/api/dhyana-vahini/videos/?year=2026')
        self.assertEqual(response.status_code, 200)
        video_ids = [video['video_id'] for video in response.json()]
        # The active record is returned; the inactive one is filtered out.
        # (Assert presence/absence rather than an exact count, since a data
        # migration also seeds videos for this year.)
        self.assertIn('first-video', video_ids)
        self.assertNotIn('hidden-video', video_ids)

    def test_videos_requires_an_integer_year(self):
        self.assertEqual(self.client.get('/api/dhyana-vahini/videos/').status_code, 400)
        self.assertEqual(self.client.get('/api/dhyana-vahini/videos/?year=invalid').status_code, 400)


class DhyanaVahiniTextEndpointTests(TestCase):
    def setUp(self):
        DhyanaVahiniText.objects.create(
            year=2026,
            roll_number='roll-001',
            name='First Student',
            reflection='A complete reflection.',
        )
        DhyanaVahiniText.objects.create(
            year=2026,
            roll_number='hidden-001',
            name='Hidden Student',
            reflection='Do not publish this.',
            is_active=False,
        )

    def test_text_returns_the_frontend_response_shape(self):
        response = self.client.get('/api/dhyana-vahini/text/?year=2026')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        # The active record is returned in {id, name, reflection} shape; the
        # inactive one is filtered out. (Assert presence/absence rather than an
        # exact list, since a data migration also seeds records for this year.)
        self.assertIn(
            {
                'id': 'roll-001',
                'name': 'First Student',
                'reflection': 'A complete reflection.',
            },
            payload,
        )
        ids = [item['id'] for item in payload]
        self.assertNotIn('hidden-001', ids)

    def test_text_requires_an_integer_year(self):
        self.assertEqual(self.client.get('/api/dhyana-vahini/text/').status_code, 400)
        self.assertEqual(self.client.get('/api/dhyana-vahini/text/?year=invalid').status_code, 400)


class GalleryModelTests(SimpleTestCase):
    def test_extract_drive_folder_id_from_url(self):
        url = 'https://drive.google.com/drive/folders/1ABCdef_-XYZ?usp=drive_link'
        self.assertEqual(extract_drive_folder_id(url), '1ABCdef_-XYZ')

    def test_extract_drive_folder_id_from_bare_id(self):
        self.assertEqual(extract_drive_folder_id('1ABCdef_-XYZ0'), '1ABCdef_-XYZ0')

    def test_extract_drive_folder_id_empty(self):
        self.assertEqual(extract_drive_folder_id(''), '')
        self.assertEqual(extract_drive_folder_id('not a link'), '')


class GalleryEndpointTests(TestCase):
    # Use a far-future year that the seed migration never touches, so these
    # tests are independent of the seeded gallery data.
    YEAR = 2099
    EMPTY_YEAR = 2098

    def setUp(self):
        self.induction = GalleryAlbum.objects.create(
            year=self.YEAR, title='Induction Session', order=1,
        )
        self.graduation = GalleryAlbum.objects.create(
            year=self.YEAR, title='Graduation', order=2,
        )
        # Card with no photos -> should not appear in albums list
        GalleryAlbum.objects.create(year=self.YEAR, title='Empty Album', order=3)
        # A year with a card but no photos -> should be hidden from years
        GalleryAlbum.objects.create(year=self.EMPTY_YEAR, title='Empty Year Card', order=1)

        for i in range(1, 4):
            GalleryPhoto.objects.create(
                album=self.induction,
                drive_file_id=f'induction-{i}',
                thumbnail_link=f'https://drive.google.com/thumbnail?id=induction-{i}&sz=w400',
                full_link=f'https://drive.google.com/thumbnail?id=induction-{i}&sz=w1600',
                order=i,
            )
        GalleryPhoto.objects.create(
            album=self.graduation,
            drive_file_id='grad-1',
            thumbnail_link='https://drive.google.com/thumbnail?id=grad-1&sz=w400',
            full_link='https://drive.google.com/thumbnail?id=grad-1&sz=w1600',
            order=1,
        )

    def test_years_endpoint_only_returns_years_with_photos(self):
        response = self.client.get('/api/gallery/years/')
        self.assertEqual(response.status_code, 200)
        years = [row['year'] for row in response.json()]
        self.assertIn(self.YEAR, years)
        self.assertNotIn(self.EMPTY_YEAR, years)  # empty year hidden

    def test_years_endpoint_reports_counts(self):
        response = self.client.get('/api/gallery/years/')
        row = next(r for r in response.json() if r['year'] == self.YEAR)
        self.assertEqual(row['album_count'], 2)   # only albums with photos
        self.assertEqual(row['photo_count'], 4)   # 3 + 1

    def test_albums_endpoint_hides_empty_albums(self):
        response = self.client.get(f'/api/gallery/albums/?year={self.YEAR}')
        self.assertEqual(response.status_code, 200)
        titles = [a['title'] for a in response.json()]
        self.assertIn('Induction Session', titles)
        self.assertIn('Graduation', titles)
        self.assertNotIn('Empty Album', titles)

    def test_albums_endpoint_requires_year(self):
        self.assertEqual(self.client.get('/api/gallery/albums/').status_code, 400)

    def test_photos_endpoint_is_paginated(self):
        response = self.client.get(f'/api/gallery/photos/?album={self.induction.id}')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('results', payload)
        self.assertIn('count', payload)
        self.assertEqual(payload['count'], 3)
        self.assertEqual(len(payload['results']), 3)
        self.assertIn('thumbnail_link', payload['results'][0])
        self.assertIn('full_link', payload['results'][0])

    def test_photos_endpoint_requires_album(self):
        self.assertEqual(self.client.get('/api/gallery/photos/').status_code, 400)

    def test_inactive_photos_excluded(self):
        GalleryPhoto.objects.filter(album=self.graduation).update(is_active=False)
        response = self.client.get(f'/api/gallery/albums/?year={self.YEAR}')
        titles = [a['title'] for a in response.json()]
        # Graduation now has no active photos -> hidden
        self.assertNotIn('Graduation', titles)


class NewsletterEndpointTests(TestCase):
    def setUp(self):
        # An active edition in a fresh year so we can assert on it deterministically
        # without depending on the seeded 2026 rows.
        Newsletter.objects.create(
            month=1,
            year=2099,
            flipbook_url='https://heyzine.com/flip-book/test-active.html',
        )
        Newsletter.objects.create(
            month=2,
            year=2099,
            flipbook_url='https://heyzine.com/flip-book/test-hidden.html',
            is_active=False,
        )

    def test_newsletters_groups_are_ascending_with_newest_year_current(self):
        # Add an older year so we have two groups to compare.
        Newsletter.objects.create(month=5, year=2097, flipbook_url='https://heyzine.com/flip-book/older.html')

        response = self.client.get('/api/newsletters/')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('groups', payload)

        years = [group['year'] for group in payload['groups']]
        self.assertIn(2099, years)
        self.assertIn(2097, years)
        # Groups are ordered oldest year first (ascending) for the archive layout.
        self.assertEqual(years, sorted(years))

        # Only the newest year is flagged current; older years are archived.
        current_years = [g['year'] for g in payload['groups'] if g['is_current']]
        self.assertEqual(current_years, [max(years)])

    def test_newsletters_are_ordered_january_to_december_within_a_year(self):
        # Insert months out of order for a fresh year.
        Newsletter.objects.create(month=12, year=2098, flipbook_url='https://heyzine.com/flip-book/dec.html')
        Newsletter.objects.create(month=3, year=2098, flipbook_url='https://heyzine.com/flip-book/mar.html')
        Newsletter.objects.create(month=8, year=2098, flipbook_url='https://heyzine.com/flip-book/aug.html')

        response = self.client.get('/api/newsletters/')
        group_2098 = next(g for g in response.json()['groups'] if g['year'] == 2098)
        months = [issue['month'] for issue in group_2098['issues']]
        # Calendar order regardless of insertion order.
        self.assertEqual(months, [3, 8, 12])

    def test_newsletters_latest_is_the_most_recent_active_edition(self):
        # Highest year, then highest month, among active editions.
        Newsletter.objects.create(month=6, year=2099, flipbook_url='https://heyzine.com/flip-book/latest.html')
        response = self.client.get('/api/newsletters/')
        latest = response.json()['latest']
        self.assertIsNotNone(latest)
        self.assertEqual(latest['year'], 2099)
        self.assertEqual(latest['month'], 6)

    def test_newsletters_excludes_inactive_editions(self):
        response = self.client.get('/api/newsletters/')
        urls = [
            issue['flipbook_url']
            for group in response.json()['groups']
            for issue in group['issues']
        ]
        self.assertIn('https://heyzine.com/flip-book/test-active.html', urls)
        self.assertNotIn('https://heyzine.com/flip-book/test-hidden.html', urls)

    def test_newsletter_title_defaults_to_month_and_year(self):
        edition = Newsletter.objects.get(month=1, year=2099)
        self.assertEqual(edition.display_title, 'January 2099')


class NetritvamEndpointTests(TestCase):
    # Use high serial numbers that the seed migration (1-7) never uses, so these
    # tests are independent of the seeded data.
    def setUp(self):
        # Insert out of order to prove ordering is by serial number.
        Netritvam.objects.create(serial_number=91, flipbook_url='https://heyzine.com/flip-book/n91.html')
        Netritvam.objects.create(serial_number=93, flipbook_url='https://heyzine.com/flip-book/n93.html')
        Netritvam.objects.create(serial_number=92, flipbook_url='https://heyzine.com/flip-book/n92.html')
        Netritvam.objects.create(
            serial_number=99,
            flipbook_url='https://heyzine.com/flip-book/hidden.html',
            is_active=False,
        )

    def test_returns_latest_and_issues(self):
        response = self.client.get('/api/netritvam/')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('latest', payload)
        self.assertIn('issues', payload)

    def test_latest_is_highest_active_serial(self):
        payload = self.client.get('/api/netritvam/').json()
        # 93 is the highest active serial across seed (7) + these test rows.
        self.assertEqual(payload['latest']['serial_number'], 93)
        self.assertEqual(payload['latest']['title'], 'Netritvam-93')

    def test_issues_ordered_by_serial_ascending(self):
        payload = self.client.get('/api/netritvam/').json()
        serials = [issue['serial_number'] for issue in payload['issues']]
        self.assertEqual(serials, sorted(serials))
        # Our active test rows appear in order; the inactive one does not.
        test_serials = [s for s in serials if s in (91, 92, 93, 99)]
        self.assertEqual(test_serials, [91, 92, 93])

    def test_inactive_issue_excluded(self):
        payload = self.client.get('/api/netritvam/').json()
        serials = [issue['serial_number'] for issue in payload['issues']]
        self.assertNotIn(99, serials)

    def test_display_title_defaults_to_serial(self):
        issue = Netritvam.objects.get(serial_number=92)
        self.assertEqual(issue.display_title, 'Netritvam-92')
