from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from werkzeug.utils import secure_filename
import uuid
import jwt
import datetime
import bcrypt  # add this for hashing passwords
from functools import wraps

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
SECRET_KEY = 'yoursecretkey'  # Use environment variable in production


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_db():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    # Hash password before storing
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        conn = get_db()
        conn.execute('INSERT INTO users (username, password) VALUES (?, ?)', (username, hashed_password))
        conn.commit()
        conn.close()
        return jsonify({'message': 'User registered!'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 409


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    conn = get_db()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, SECRET_KEY, algorithm='HS256')
        return jsonify({'token': token, 'user_id': user['id'], 'username': user['username']})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401


@app.route('/api/lost-items', methods=['POST'])
def add_lost_item():
    # Getting form data for lost item
    name = request.form.get('name')
    email = request.form.get('email')
    item_description = request.form.get('item')  # use this key, not 'item'
    date_lost = request.form.get('date')                # use this key, not 'date'
    image_file = request.files.get('image')
    image_path = None

    if not all([name, email, item_description, date_lost]):
        return jsonify({'error': 'All fields required.'}), 400

    # Save image if valid
    if image_file and image_file.filename != '' and allowed_file(image_file.filename):
        filename = secure_filename(image_file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        image_path_full = os.path.join(UPLOAD_FOLDER, unique_filename)
        image_file.save(image_path_full)
        image_path = unique_filename  # Save relative path, used in URL

    try:
        conn = get_db()
        # Insert lost item WITHOUT user_id (since we removed it)
        conn.execute('''
            INSERT INTO lost_items (name, email, item_description, date_lost, image_path)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, item_description, date_lost, image_path))
        conn.commit()
        conn.close()
    except Exception as e:
        print('Database error:', e)  # Print actual error for debugging
        return jsonify({'error': 'Internal server error'}), 500

    return jsonify({'message': 'Item added!'}), 201


@app.route('/api/lost-items', methods=['GET'])
def get_lost_items():
    try:
        conn = get_db()
        items = conn.execute('SELECT id, name, email, item_description, date_lost, image_path FROM lost_items').fetchall()
        conn.close()
        # Convert rows to dict list for JSON
        return jsonify([dict(ix) for ix in items])
    except Exception as e:
        print("Database error:", e)
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/images/<path:filename>')
def uploaded_file(filename):
    # Serve image files from images folder
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=False)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
