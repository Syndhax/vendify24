# Vendify24 (vendify24.com) - 24-Hour Business Website Builder

> Turn any vendor or small business into a sleek, mobile-optimized website in **24 hours**, starting at just **$2/month** (without admin login) and **$10/month** (with admin login). Built for WhatsApp vendors, Instagram sellers, TikTok shops, boutiques, bakers, and local merchants worldwide.

---

## 🌟 How the Platform Works (Your Exact Workflow)

```
  ┌─────────────────────────────────────────────────────────────┐
  │ 1. WhatsApp Vendor Visits Website                           │
  │    Selects Plan:                                            │
  │    • $2/month (Basic - No Admin Login)                      │
  │    • $10/month (Pro - With Private Admin Login)             │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 2. Vendor Submits Business Details                          │
  │    • Business name, tagline, WhatsApp number, currency       │
  │    • Products, prices, descriptions, and photo links        │
  │    • Social media handles (Instagram, TikTok, Facebook)     │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 3. 24-Hour Live Countdown Begins Immediately                │
  │    • Vendor is redirected to their unique tracking page     │
  │    • Real-time digital clock (Hours : Mins : Secs) ticks     │
  │    • Displays: "Your website will be ready in 24 hours!"    │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 4. You (The Platform Owner) Create the Website              │
  │    • Sign in to /admin (Default Password: admin123)         │
  │    • View all vendor submissions and product catalogs       │
  │    • Create their website and submit their live link        │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │ 5. When the 24 Hours Expire                                 │
  │    • The vendor's page unlocks and displays their link!     │
  │    • "🎉 Your Website is Live & Ready!"                     │
  │    • Direct "Visit Website" button & 1-Click WhatsApp share │
  │    • For $10 Pro: Displays their Admin Login credentials    │
  └─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### 1. Requirements
- Python 3.10+ (Python 3.12 is already tested and supported)
- Flask (`pip install flask`)

### 2. Launch the Application
Run the following command in the project directory:

```bash
python app.py
```

Open your browser:
- **Customer Platform:** `http://127.0.0.1:5000`
- **Track Countdown:** `http://127.0.0.1:5000/track`
- **Owner Admin Portal:** `http://127.0.0.1:5000/admin`
  - **Default Password:** `admin123`

---

## 📦 Key Pages & URLs

| Route | Description |
|---|---|
| `/` | **Landing Page**: Explains the 24H turnaround, $2 and $10 pricing tiers, demo preview, and order lookup. |
| `/order` | **Submission Wizard**: 4-step form where vendors choose their plan, enter business info, and add products. |
| `/status/<order_id>` | **24-Hour Countdown & Delivery**: The live countdown timer. When 24 hours expire, displays their live website link! |
| `/track` | **Order Finder**: Allows vendors to lookup their countdown using their Order ID or WhatsApp number. |
| `/admin` | **Owner Dashboard**: View vendor submissions, submit live website links, and track countdowns. |
| `/preview/<order_id>` | **Built-in Auto-Generated Store**: A live WhatsApp e-commerce storefront with shopping bag and 1-click WhatsApp order formatting. |
| `/preview/<order_id>/vendor-admin` | **Pro ($10) Vendor Dashboard**: Demonstrates the private admin login feature for Pro vendors. |

---

## 🛠️ Admin Dashboard Superpowers

When you log into `/admin` with `admin123`:
1. **View Full Vendor Submissions**: See their business name, category, currency, and every product they submitted with photos and prices.
2. **1-Click WhatsApp Chat**: Directly opens WhatsApp Web to talk with the vendor with a pre-filled greeting.
3. **Submit Website Link**: Paste the URL of the website you built for them (e.g. `https://mybakeshop.com` or custom domain).
4. **Publishing Options**:
   - **Countdown (Default)**: The website link is held and automatically revealed when the 24 hours expire.
   - **Immediate**: If you finished early and want to surprise them, toggle "Immediate" to reveal it right away.
5. **Fast-Forward 24H Timer (Simulation Tool)**: For testing, click *"Fast-Forward 24H (Expire Timer)"* to immediately see how the vendor's page transforms into the celebratory live website screen!
6. **Built-in Instant Store Generator**: Click *"Use built-in auto-generated store link"* to instantly use the pre-built WhatsApp store template for their business.

---

## 🧪 Automated Tests

The platform includes a complete test suite verifying all routes, countdown calculations, admin link submissions, and 24-hour expiration reveals:

```bash
python test_app.py
```

All 5 tests run and pass in under 0.5s!

---

## 🌐 Deploying to Production

When you are ready to put this online:
1. **Render.com / Railway / Fly.io**:
   - Set Build Command: `pip install -r requirements.txt` (or `pip install flask`)
   - Set Start Command: `python app.py` (or `gunicorn app:app`)
2. **Environment Variables**:
   - `SECRET_KEY`: Set a secure random string for session encryption.
