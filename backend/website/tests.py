from django.test import SimpleTestCase, TestCase

from website.models import DhyanaVahiniText, DhyanaVahiniVideo


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
