from django.test import SimpleTestCase, TestCase


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
