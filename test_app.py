import unittest
import json
from app import app
from db import init_db

class TestVendify24Platform(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()
        init_db()

    def test_homepage(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'$2', response.data)
        self.assertIn(b'$10', response.data)
        self.assertIn(b'24 Hours', response.data)

    def test_order_page_get(self):
        response = self.client.get('/order?plan=basic_2')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Basic Website', response.data)

        response_pro = self.client.get('/order?plan=pro_10')
        self.assertEqual(response_pro.status_code, 200)
        self.assertIn(b'Pro Website', response_pro.data)

    def test_order_submission_and_countdown_flow(self):
        # 1. Vendor submits their business info
        post_data = {
            'plan_type': 'basic_2',
            'business_name': 'Test Floral Blooms',
            'vendor_name': 'Rose Tyler',
            'whatsapp_number': '+15551234567',
            'currency': '$',
            'category': 'Retail',
            'tagline': 'Hand-picked flowers and bespoke bouquets',
            'address': 'London UK',
            'product_name[]': ['Red Rose Bouquet', 'White Lily Basket'],
            'product_price[]': ['35.00', '42.00'],
            'product_desc[]': ['12 fresh red roses', 'Beautiful fragrant lilies'],
            'product_image[]': ['', '']
        }
        res = self.client.post('/order', data=post_data, follow_redirects=False)
        self.assertEqual(res.status_code, 302)
        location = res.headers['Location']
        self.assertIn('/status/V24-', location)
        
        # Extract generated order ID
        order_id = location.split('/status/')[1].split('?')[0]

        # 2. Check the Status Page (24-hour countdown active)
        status_res = self.client.get(f'/status/{order_id}')
        self.assertEqual(status_res.status_code, 200)
        self.assertIn(b'Your Website Will Be Ready In', status_res.data)
        self.assertIn(b'Test Floral Blooms', status_res.data)

        # 3. Check Status API
        api_res = self.client.get(f'/api/status/{order_id}')
        self.assertEqual(api_res.status_code, 200)
        api_data = json.loads(api_res.data)
        self.assertEqual(api_data['id'], order_id)
        self.assertFalse(api_data['can_show_website'])
        self.assertGreater(api_data['seconds_left'], 80000) # ~24h in seconds

        # 4. Owner logs in to Admin Portal
        login_res = self.client.post('/admin/login', data={'password': 'admin123'}, follow_redirects=True)
        self.assertEqual(login_res.status_code, 200)
        self.assertIn(b'Vendor Queue', login_res.data)
        self.assertIn(b'Test Floral Blooms', login_res.data)

        # 5. Owner creates website for vendor and submits the link!
        submitted_url = f"https://testfloralblooms.xol.store"
        update_res = self.client.post(f'/admin/order/{order_id}/update', data={
            'website_url': submitted_url,
            'status': 'ready',
            'publish_mode': 'countdown',
            'vendor_admin_url': '',
            'vendor_admin_user': '',
            'vendor_admin_pass': '',
            'admin_notes': 'Website design finalized and ready.'
        }, follow_redirects=True)
        self.assertEqual(update_res.status_code, 200)

        # Before 24h expires, website link should still be withheld (publish_mode = countdown)
        api_res_before = self.client.get(f'/api/status/{order_id}')
        data_before = json.loads(api_res_before.data)
        self.assertFalse(data_before['can_show_website'])

        # 6. 24 Hours Expire! (Simulate timer expiration)
        sim_res = self.client.post(f'/admin/order/{order_id}/simulate-time', data={'action': 'expire'}, follow_redirects=True)
        self.assertEqual(sim_res.status_code, 200)

        # 7. Check the Status Page again: THE LIVE WEBSITE LINK IS REVEALED!
        status_res_after = self.client.get(f'/status/{order_id}')
        self.assertEqual(status_res_after.status_code, 200)
        self.assertIn(b'Your Website Is Live!', status_res_after.data)
        self.assertIn(submitted_url.encode('utf-8'), status_res_after.data)
        self.assertIn(b'Visit Website', status_res_after.data)

        # API returns live URL
        api_res_after = self.client.get(f'/api/status/{order_id}')
        data_after = json.loads(api_res_after.data)
        self.assertTrue(data_after['can_show_website'])
        self.assertEqual(data_after['website_url'], submitted_url)

    def test_instant_publish_mode(self):
        # Create an order and test publish_mode='immediate'
        post_data = {
            'plan_type': 'pro_10',
            'business_name': 'Instant Express Tech',
            'whatsapp_number': '+19998887777',
            'product_name[]': ['Wireless Earbuds'],
            'product_price[]': ['29.99']
        }
        res = self.client.post('/order', data=post_data)
        order_id = res.headers['Location'].split('/status/')[1].split('?')[0]

        # Login and submit link with immediate publish
        self.client.post('/admin/login', data={'password': 'admin123'})
        self.client.post(f'/admin/order/{order_id}/update', data={
            'website_url': 'https://expresstech.shop',
            'status': 'completed',
            'publish_mode': 'immediate',
            'vendor_admin_url': 'https://expresstech.shop/admin',
            'vendor_admin_user': 'admin',
            'vendor_admin_pass': 'pass123'
        })

        # Should be visible immediately
        api_res = self.client.get(f'/api/status/{order_id}')
        data = json.loads(api_res.data)
        self.assertTrue(data['can_show_website'])
        self.assertEqual(data['website_url'], 'https://expresstech.shop')

    def test_auto_generated_preview_store(self):
        res = self.client.get('/preview/WV-LX9032')
        self.assertEqual(res.status_code, 200)
        self.assertIn(b'Luxe Aura Boutique', res.data)
        self.assertIn(b'Emerald Silk Midi Dress', res.data)
        self.assertIn(b'Order On WhatsApp', res.data)

if __name__ == '__main__':
    unittest.main()
