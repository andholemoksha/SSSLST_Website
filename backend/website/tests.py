from django.test import SimpleTestCase, TestCase

from website.models import DhyanaVahiniText, DhyanaVahiniVideo, Netritvam


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


class PublicationsEndpointTests(TestCase):
    """Netritvam mirrors the Newsletter feature: latest + year groups, no featured flag."""

    def test_publications_endpoint_returns_latest_and_year_groups(self):
        response = self.client.get('/api/v1/publications/')
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn('latest', payload)
        self.assertIn('groups', payload)
        # Seeded 2026 issues should appear.
        years = [group['year'] for group in payload['groups']]
        self.assertIn(2026, years)

    def test_latest_is_the_most_recent_active_issue(self):
        Netritvam.objects.create(
            serial_number=1,
            year=2099,
            publication_url='https://heyzine.com/flip-book/latest.html',
        )
        response = self.client.get('/api/v1/publications/')
        latest = response.json()['latest']
        self.assertIsNotNone(latest)
        self.assertEqual(latest['year'], 2099)

    def test_groups_are_ascending_with_newest_year_current(self):
        Netritvam.objects.create(
            serial_number=1,
            year=2097,
            publication_url='https://heyzine.com/flip-book/older.html',
        )
        Netritvam.objects.create(
            serial_number=1,
            year=2099,
            publication_url='https://heyzine.com/flip-book/newer.html',
        )
        payload = self.client.get('/api/v1/publications/').json()
        years = [group['year'] for group in payload['groups']]
        self.assertEqual(years, sorted(years))  # ascending
        current_years = [g['year'] for g in payload['groups'] if g['is_current']]
        self.assertEqual(current_years, [max(years)])

    def test_issues_are_ordered_by_serial_number_within_a_year(self):
        # Insert out of order for a fresh year.
        Netritvam.objects.create(serial_number=3, year=2098, publication_url='https://heyzine.com/flip-book/3.html')
        Netritvam.objects.create(serial_number=1, year=2098, publication_url='https://heyzine.com/flip-book/1.html')
        Netritvam.objects.create(serial_number=2, year=2098, publication_url='https://heyzine.com/flip-book/2.html')
        payload = self.client.get('/api/v1/publications/').json()
        group = next(g for g in payload['groups'] if g['year'] == 2098)
        numbers = [issue['serial_number'] for issue in group['issues']]
        self.assertEqual(numbers, [1, 2, 3])

    def test_excludes_inactive_issues(self):
        Netritvam.objects.create(
            serial_number=9,
            year=2098,
            publication_url='https://heyzine.com/flip-book/hidden.html',
            is_active=False,
        )
        payload = self.client.get('/api/v1/publications/').json()
        urls = [issue['publication_url'] for g in payload['groups'] for issue in g['issues']]
        self.assertNotIn('https://heyzine.com/flip-book/hidden.html', urls)
