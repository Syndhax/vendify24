import json
from datetime import datetime, timedelta
from db import get_db, init_db

def seed_demo_data():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Clear existing demo if any
    cursor.execute("SELECT COUNT(*) FROM orders")
    count = cursor.fetchone()[0]
    if count > 0:
        print("Database already contains orders, skipping demo seed.")
        conn.close()
        return

    now = datetime.utcnow()

    # 1. Active Order ($2 Starter) - 23 hours remaining
    order_1_id = "WV-BK7421"
    created_1 = now - timedelta(hours=1)
    target_1 = created_1 + timedelta(hours=24) # ~23 hours left
    prods_1 = [
        {
            "id": 1,
            "name": "Triple Chocolate Fudge Cake",
            "price": "28.00",
            "desc": "Rich dark chocolate sponge layered with Belgian ganache.",
            "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60",
            "category": "Cakes"
        },
        {
            "id": 2,
            "name": "Strawberry Cream Cupcakes (Box of 6)",
            "price": "14.50",
            "desc": "Fresh vanilla bean cupcakes filled with real strawberries.",
            "image": "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=500&auto=format&fit=crop&q=60",
            "category": "Cupcakes"
        }
    ]

    cursor.execute('''
    INSERT INTO orders (
        id, created_at, target_delivery_at, plan_type, plan_name, plan_price,
        business_name, vendor_name, whatsapp_number, email, category, currency,
        tagline, about_text, address, instagram, facebook, tiktok,
        products_json, status, website_url, publish_mode, is_published
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_1_id,
        created_1.isoformat(),
        target_1.isoformat(),
        'basic_2',
        'Starter Showcase ($2/mo)',
        2.0,
        "Sweet Treats Bakery",
        "Amina Yusuf",
        "+1 (234) 567-8901",
        "amina@sweettreats.shop",
        "Food & Bakery",
        "$",
        "Artisanal fresh-baked pastries & celebration cakes delivered daily.",
        "We make each pastry from scratch using organic ingredients.",
        "Downtown Arts District | Delivery 9am-6pm",
        "@sweettreats_bakery",
        "",
        "",
        json.dumps(prods_1),
        'in_progress',
        '', # Admin has not yet submitted link
        'countdown',
        0
    ))

    # 2. Completed Order ($10 Pro) - 24 hours expired & Website link submitted!
    order_2_id = "WV-LX9032"
    created_2 = now - timedelta(hours=26)
    target_2 = created_2 + timedelta(hours=24) # Expired 2 hours ago!
    prods_2 = [
        {
            "id": 1,
            "name": "Emerald Silk Midi Dress",
            "price": "49.99",
            "desc": "Breathable pure silk with tie waist and flared hemline.",
            "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60",
            "category": "Dresses"
        },
        {
            "id": 2,
            "name": "Handmade Pearl Earrings",
            "price": "22.00",
            "desc": "Freshwater pearls mounted on 18k gold-plated brass.",
            "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60",
            "category": "Jewelry"
        }
    ]

    cursor.execute('''
    INSERT INTO orders (
        id, created_at, target_delivery_at, plan_type, plan_name, plan_price,
        business_name, vendor_name, whatsapp_number, email, category, currency,
        tagline, about_text, address, instagram, facebook, tiktok,
        products_json, status, website_url, publish_mode, is_published,
        vendor_admin_url, vendor_admin_user, vendor_admin_pass
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_2_id,
        created_2.isoformat(),
        target_2.isoformat(),
        'pro_10',
        'Pro Store with Admin ($10/mo)',
        10.0,
        "Luxe Aura Boutique",
        "Chloe Vance",
        "+1 (555) 987-6543",
        "chloe@luxeaura.com",
        "Fashion & Clothing",
        "$",
        "Curated premium women's apparel, statement jewelry & luxury accents.",
        "Fast doorstep shipping worldwide.",
        "West End Fashion Blvd",
        "@luxeaura_official",
        "",
        "",
        json.dumps(prods_2),
        'completed',
        'http://127.0.0.1:5000/preview/WV-LX9032', # Live website link submitted by admin
        'countdown',
        1,
        'http://127.0.0.1:5000/preview/WV-LX9032/vendor-admin',
        'chloe@luxeaura.com',
        'luxe2026'
    ))

    conn.commit()
    conn.close()
    print("Demo orders seeded successfully!")

if __name__ == '__main__':
    seed_demo_data()
