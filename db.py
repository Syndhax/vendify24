import sqlite3
import os
import json
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        target_delivery_at TEXT NOT NULL,
        plan_type TEXT NOT NULL,          -- 'basic_2' or 'pro_10'
        plan_name TEXT NOT NULL,
        plan_price REAL NOT NULL,
        business_name TEXT NOT NULL,
        vendor_name TEXT NOT NULL,
        whatsapp_number TEXT NOT NULL,
        email TEXT,
        category TEXT,
        currency TEXT DEFAULT '$',
        tagline TEXT,
        about_text TEXT,
        address TEXT,
        instagram TEXT,
        facebook TEXT,
        tiktok TEXT,
        products_json TEXT,              -- JSON string of products array
        status TEXT DEFAULT 'submitted', -- 'submitted', 'in_progress', 'ready', 'delivered'
        website_url TEXT DEFAULT '',     -- Link submitted by admin
        publish_mode TEXT DEFAULT 'countdown', -- 'countdown' (reveal when 24h expires) or 'immediate' (reveal right away)
        is_published INTEGER DEFAULT 0,  -- 1 if ready to be viewed by vendor
        vendor_admin_url TEXT DEFAULT '',-- Vendor login link for $10 plan
        vendor_admin_user TEXT DEFAULT '',
        vendor_admin_pass TEXT DEFAULT '',
        admin_notes TEXT DEFAULT ''
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    )
    ''')

    # Seed default admin password if not present
    cursor.execute("SELECT value FROM settings WHERE key = 'admin_password'")
    if not cursor.fetchone():
        cursor.execute("INSERT INTO settings (key, value) VALUES ('admin_password', 'admin123')")
        cursor.execute("INSERT INTO settings (key, value) VALUES ('platform_whatsapp', '+1234567890')")
        cursor.execute("INSERT INTO settings (key, value) VALUES ('site_name', 'Vendify24')")

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully at:", DB_PATH)
