import os
import json
import random
import string
from datetime import datetime, timedelta, timezone
from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db, init_db

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'xol_super_secret_whatsapp_store_key_2026')
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Initialize DB on start
init_db()

@app.context_processor
def inject_user():
    if 'user_id' in session:
        return {'current_user': {
            'id': session['user_id'],
            'name': session.get('user_name', 'Customer'),
            'email': session.get('user_email', '')
        }}
    return {'current_user': None}

def generate_order_id():
    """Generates a memorable order ID like V24-8492"""
    digits = ''.join(random.choices(string.digits, k=4))
    letters = ''.join(random.choices(string.ascii_uppercase, k=2))
    return f"V24-{letters}{digits}"

def parse_order_row(row):
    """Converts a sqlite3.Row into a Python dictionary with parsed JSON fields"""
    if not row:
        return None
    d = dict(row)
    try:
        d['products'] = json.loads(d['products_json']) if d['products_json'] else []
    except Exception:
        d['products'] = []
    
    # Calculate time remaining
    now = datetime.now(timezone.utc)
    try:
        # Support both naive and tz-aware strings
        target_str = d['target_delivery_at']
        if target_str.endswith('Z'):
            target_str = target_str[:-1] + '+00:00'
        target = datetime.fromisoformat(target_str)
        if target.tzinfo is None:
            target = target.replace(tzinfo=timezone.utc)
        d['target_datetime'] = target
        diff = target - now
        total_seconds = int(diff.total_seconds())
        d['seconds_left'] = max(0, total_seconds)
        d['is_expired'] = total_seconds <= 0
    except Exception as e:
        d['seconds_left'] = 0
        d['is_expired'] = True

    # Check whether the website link is ready to be shown to the vendor:
    # Condition: Admin provided a link AND (publish_mode == 'immediate' OR (publish_mode == 'countdown' and 24h expired))
    has_link = bool(d['website_url'] and d['website_url'].strip())
    is_ready_by_time = d['is_expired'] and has_link
    is_ready_immediate = (d['publish_mode'] == 'immediate') and has_link
    d['can_show_website'] = (is_ready_by_time or is_ready_immediate or d['status'] == 'completed') and has_link
    
    return d

# ----------------- Customer Facing Routes -----------------

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/collection')
@app.route('/vintage')
def vintage_gallery():
    return render_template('vintage.html')

@app.route('/auth', methods=['GET', 'POST'])
@app.route('/login', methods=['GET', 'POST'])
@app.route('/signup', methods=['GET', 'POST'])
def auth():
    if 'user_id' in session:
        return redirect(url_for('index'))
    
    tab = 'signup' if request.path == '/signup' else request.args.get('tab', 'signin')
    
    if request.method == 'POST':
        action = request.form.get('action', 'signin')
        conn = get_db()
        cursor = conn.cursor()
        
        if action == 'signup':
            name = request.form.get('name', '').strip()
            email = request.form.get('email', '').strip().lower()
            password = request.form.get('password', '')
            phone = request.form.get('phone', '').strip()
            
            if not name or not email or not password:
                flash("Please fill in all required fields (Name, Email, Password).", "error")
                return render_template('auth.html', tab='signup', name=name, email=email, phone=phone)
            
            cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
            if cursor.fetchone():
                flash("An account with this email already exists. Please sign in.", "error")
                return render_template('auth.html', tab='signin', email=email)
            
            pw_hash = generate_password_hash(password)
            now_str = datetime.now(timezone.utc).isoformat()
            cursor.execute(
                "INSERT INTO users (name, email, phone, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
                (name, email, phone, pw_hash, now_str)
            )
            conn.commit()
            user_id = cursor.lastrowid
            
            session['user_id'] = user_id
            session['user_name'] = name
            session['user_email'] = email
            
            flash(f"Welcome to Vent Atelier, {name}!", "success")
            next_url = request.args.get('next') or url_for('index')
            return redirect(next_url)
            
        else: # signin
            email = request.form.get('email', '').strip().lower()
            password = request.form.get('password', '')
            
            if not email or not password:
                flash("Please provide both email and password.", "error")
                return render_template('auth.html', tab='signin', email=email)
            
            cursor.execute("SELECT id, name, email, password_hash FROM users WHERE email = ?", (email,))
            user = cursor.fetchone()
            
            if not user or not check_password_hash(user['password_hash'], password):
                flash("Invalid email or password. Please try again.", "error")
                return render_template('auth.html', tab='signin', email=email)
            
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session['user_email'] = user['email']
            
            flash(f"Welcome back, {user['name']}!", "success")
            next_url = request.args.get('next') or url_for('index')
            return redirect(next_url)

    return render_template('auth.html', tab=tab)

@app.route('/logout')
def user_logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    session.pop('user_email', None)
    flash("You have been signed out.", "info")
    return redirect(request.referrer or url_for('index'))

@app.route('/api/auth', methods=['POST'])
def api_auth():
    data = request.get_json(silent=True) or request.form
    action = data.get('action', 'signin')
    conn = get_db()
    cursor = conn.cursor()
    
    if action == 'signup':
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        phone = data.get('phone', '').strip()
        
        if not name or not email or not password:
            return jsonify({'success': False, 'message': 'Please provide Name, Email, and Password.'}), 400
        
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'Email already registered. Please sign in.'}), 400
        
        pw_hash = generate_password_hash(password)
        now_str = datetime.now(timezone.utc).isoformat()
        cursor.execute(
            "INSERT INTO users (name, email, phone, password_hash, created_at) VALUES (?, ?, ?, ?, ?)",
            (name, email, phone, pw_hash, now_str)
        )
        conn.commit()
        user_id = cursor.lastrowid
        session['user_id'] = user_id
        session['user_name'] = name
        session['user_email'] = email
        return jsonify({'success': True, 'name': name, 'message': f'Welcome to Vent, {name}!'})
    else:
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and Password required.'}), 400
        cursor.execute("SELECT id, name, email, password_hash FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({'success': False, 'message': 'Invalid email or password.'}), 401
        session['user_id'] = user['id']
        session['user_name'] = user['name']
        session['user_email'] = user['email']
        return jsonify({'success': True, 'name': user['name'], 'message': f'Welcome back, {user["name"]}!'})

@app.route('/logo-preview')
def logo_preview():
    return render_template('logo_preview.html')

@app.route('/order', methods=['GET', 'POST'])
def order():
    if request.method == 'GET':
        prefill_plan = request.args.get('plan', 'basic_2')
        return render_template('order.html', selected_plan=prefill_plan)
    
    # Process Order Submission
    plan_type = request.form.get('plan_type', 'basic_2')
    business_name = request.form.get('business_name', '').strip()
    vendor_name = request.form.get('vendor_name', '').strip()
    whatsapp_number = request.form.get('whatsapp_number', '').strip()
    email = request.form.get('email', '').strip()
    category = request.form.get('category', 'Retail')
    currency = request.form.get('currency', '$')
    tagline = request.form.get('tagline', '').strip()
    about_text = request.form.get('about_text', '').strip()
    address = request.form.get('address', '').strip()
    instagram = request.form.get('instagram', '').strip()
    facebook = request.form.get('facebook', '').strip()
    tiktok = request.form.get('tiktok', '').strip()

    if not business_name or not whatsapp_number:
        flash("Please provide at least your Business Name and WhatsApp Number.", "error")
        return redirect(url_for('order', plan=plan_type))

    # Parse dynamic products submitted from form
    product_names = request.form.getlist('product_name[]')
    product_prices = request.form.getlist('product_price[]')
    product_descs = request.form.getlist('product_desc[]')
    product_images = request.form.getlist('product_image[]')
    product_cats = request.form.getlist('product_category[]')

    products = []
    for i in range(len(product_names)):
        name = product_names[i].strip()
        if name:
            price = product_prices[i].strip() if i < len(product_prices) else '0'
            desc = product_descs[i].strip() if i < len(product_descs) else ''
            img = product_images[i].strip() if i < len(product_images) else ''
            cat = product_cats[i].strip() if i < len(product_cats) else 'General'
            products.append({
                'id': i + 1,
                'name': name,
                'price': price,
                'desc': desc,
                'image': img or 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
                'category': cat
            })

    # Fallback product if vendor submitted none
    if not products:
        products = [
            {
                'id': 1,
                'name': f"{business_name} Featured Product",
                'price': "15.00",
                'desc': "Best quality product tailored for our customers.",
                'image': "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60",
                'category': "Featured"
            }
        ]

    plan_name = "Starter Showcase ($2/mo)" if plan_type == 'basic_2' else "Pro Store with Admin ($10/mo)"
    plan_price = 2.0 if plan_type == 'basic_2' else 10.0

    order_id = generate_order_id()
    created_at = datetime.now(timezone.utc)
    target_delivery = created_at + timedelta(hours=24)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO orders (
        id, created_at, target_delivery_at, plan_type, plan_name, plan_price,
        business_name, vendor_name, whatsapp_number, email, category, currency,
        tagline, about_text, address, instagram, facebook, tiktok,
        products_json, status, website_url, publish_mode, is_published
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        order_id,
        created_at.isoformat(),
        target_delivery.isoformat(),
        plan_type,
        plan_name,
        plan_price,
        business_name,
        vendor_name or business_name,
        whatsapp_number,
        email,
        category,
        currency,
        tagline,
        about_text,
        address,
        instagram,
        facebook,
        tiktok,
        json.dumps(products),
        'submitted',
        '', # website_url will be filled by admin
        'countdown',
        0
    ))
    conn.commit()
    conn.close()

    return redirect(url_for('status', order_id=order_id, new='1'))

@app.route('/status/<order_id>')
def status(order_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        flash("Order ID not found. Please check your reference code.", "error")
        return redirect(url_for('track'))

    order_data = parse_order_row(row)
    is_new = request.args.get('new') == '1'
    return render_template('status.html', order=order_data, is_new=is_new)

@app.route('/api/status/<order_id>')
def api_status(order_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({'error': 'Order not found'}), 404

    order_data = parse_order_row(row)
    return jsonify({
        'id': order_data['id'],
        'status': order_data['status'],
        'seconds_left': order_data['seconds_left'],
        'is_expired': order_data['is_expired'],
        'can_show_website': order_data['can_show_website'],
        'website_url': order_data['website_url'] if order_data['can_show_website'] else '',
        'plan_type': order_data['plan_type'],
        'vendor_admin_url': order_data['vendor_admin_url'] if order_data['can_show_website'] else '',
        'vendor_admin_user': order_data['vendor_admin_user'] if order_data['can_show_website'] else ''
    })

@app.route('/track', methods=['GET', 'POST'])
def track():
    if request.method == 'POST':
        query = request.form.get('query', '').strip()
        if not query:
            flash("Please enter an Order ID or your WhatsApp Number.", "error")
            return render_template('track.html')

        conn = get_db()
        cursor = conn.cursor()
        # Search by ID or WhatsApp number
        cursor.execute("SELECT id FROM orders WHERE id = ? OR whatsapp_number LIKE ? ORDER BY created_at DESC LIMIT 1", 
                       (query, f"%{query}%"))
        result = cursor.fetchone()
        conn.close()

        if result:
            return redirect(url_for('status', order_id=result['id']))
        else:
            flash("No order found matching your inquiry. Please double-check your Order ID or phone number.", "error")

    return render_template('track.html')

# ----------------- Admin Management Routes -----------------

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if session.get('is_admin'):
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        password = request.form.get('password', '')
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT value FROM settings WHERE key = 'admin_password'")
        row = cursor.fetchone()
        conn.close()

        saved_pass = row['value'] if row else 'admin123'
        if password == saved_pass:
            session['is_admin'] = True
            flash("Welcome to the Admin Portal!", "success")
            return redirect(url_for('admin_dashboard'))
        else:
            flash("Invalid administrator password.", "error")

    return render_template('admin_login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('is_admin', None)
    flash("You have been signed out.", "info")
    return redirect(url_for('admin_login'))

@app.route('/admin')
def admin_dashboard():
    if not session.get('is_admin'):
        return redirect(url_for('admin_login'))

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    orders = [parse_order_row(r) for r in rows]

    # Metrics
    total_orders = len(orders)
    basic_orders = sum(1 for o in orders if o['plan_type'] == 'basic_2')
    pro_orders = sum(1 for o in orders if o['plan_type'] == 'pro_10')
    completed_orders = sum(1 for o in orders if o['status'] == 'completed' or (o['website_url'] and o['website_url'].strip()))
    active_countdowns = sum(1 for o in orders if not o['is_expired'] and o['status'] != 'completed')
    total_revenue = (basic_orders * 2) + (pro_orders * 10)

    return render_template('admin_dashboard.html', 
                           orders=orders, 
                           total_orders=total_orders,
                           basic_orders=basic_orders,
                           pro_orders=pro_orders,
                           completed_orders=completed_orders,
                           active_countdowns=active_countdowns,
                           total_revenue=total_revenue)

@app.route('/admin/order/<order_id>/update', methods=['POST'])
def admin_order_update(order_id):
    if not session.get('is_admin'):
        return redirect(url_for('admin_login'))

    website_url = request.form.get('website_url', '').strip()
    status = request.form.get('status', 'in_progress')
    publish_mode = request.form.get('publish_mode', 'countdown') # 'countdown' or 'immediate'
    vendor_admin_url = request.form.get('vendor_admin_url', '').strip()
    vendor_admin_user = request.form.get('vendor_admin_user', '').strip()
    vendor_admin_pass = request.form.get('vendor_admin_pass', '').strip()
    admin_notes = request.form.get('admin_notes', '').strip()

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE orders SET
        website_url = ?,
        status = ?,
        publish_mode = ?,
        vendor_admin_url = ?,
        vendor_admin_user = ?,
        vendor_admin_pass = ?,
        admin_notes = ?
    WHERE id = ?
    ''', (
        website_url,
        status,
        publish_mode,
        vendor_admin_url,
        vendor_admin_user,
        vendor_admin_pass,
        admin_notes,
        order_id
    ))
    conn.commit()
    conn.close()

    flash(f"Order {order_id} updated successfully! Website link submitted.", "success")
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/order/<order_id>/simulate-time', methods=['POST'])
def admin_simulate_time(order_id):
    """
    Demo/Testing tool: allows the administrator to expire the 24-hour countdown immediately
    or set it back to active to test the exact delivery behavior!
    """
    if not session.get('is_admin'):
        return jsonify({'error': 'Unauthorized'}), 403

    action = request.form.get('action', 'expire') # 'expire' or 'reset'
    conn = get_db()
    cursor = conn.cursor()

    if action == 'expire':
        # Set target_delivery_at to 10 seconds ago
        past_time = (datetime.now(timezone.utc) - timedelta(minutes=5)).isoformat()
        cursor.execute("UPDATE orders SET target_delivery_at = ? WHERE id = ?", (past_time, order_id))
    else:
        # Reset to 24 hours from now
        future_time = (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat()
        cursor.execute("UPDATE orders SET target_delivery_at = ? WHERE id = ?", (future_time, order_id))

    conn.commit()
    conn.close()
    flash(f"24-hour timer simulation updated for order {order_id} ({action})!", "info")
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/order/<order_id>/delete', methods=['POST'])
def admin_order_delete(order_id):
    if not session.get('is_admin'):
        return redirect(url_for('admin_login'))

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM orders WHERE id = ?", (order_id,))
    conn.commit()
    conn.close()

    flash(f"Order {order_id} has been deleted.", "info")
    return redirect(url_for('admin_dashboard'))

# ----------------- Auto-Generated Live WhatsApp Store Preview -----------------

@app.route('/preview/<order_id>')
def preview_store(order_id):
    """
    Renders a live, fully functional WhatsApp storefront generated directly
    from the vendor's submitted information!
    This allows the admin or vendor to immediately test their website with
    1-click WhatsApp order formatting.
    """
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return "Store not found", 404

    order_data = parse_order_row(row)
    return render_template('vendor_store.html', store=order_data)

@app.route('/preview/<order_id>/vendor-admin')
def preview_vendor_admin(order_id):
    """
    Demonstrates the $10 Pro Plan Admin Login capability!
    Allows the vendor to log in to manage their products and orders.
    """
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ?", (order_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return "Store not found", 404

    order_data = parse_order_row(row)
    return render_template('vendor_admin.html', store=order_data)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("Starting Vent Collection Platform...")
    print(f"Customer Site: http://127.0.0.1:{port}")
    print(f"Admin Portal: http://127.0.0.1:{port}/admin (Password: admin123)")
    app.run(host='127.0.0.1', port=port, debug=False)
