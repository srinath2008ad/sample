from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import os
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'images'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed image extensions (optional, for security)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/lost-items', methods=['POST'])
def add_lost_item():
    # For debugging: print form data and files received
    print("Received form data:", request.form)
    print("Received files:", request.files)

    name = request.form.get('name')
    email = request.form.get('email')
    item_description = request.form.get('item')
    date_lost = request.form.get('date')

    # Validation: Ensure required fields are present and non-empty
    if not all([name, email, item_description, date_lost]):
        return jsonify({'error': 'One or more required fields are missing.'}), 400

    image_file = request.files.get('image')
    image_path = None

    if image_file and image_file.filename != '':
        if allowed_file(image_file.filename):
            # Secure the filename and make unique by appending a uuid
            filename = secure_filename(image_file.filename)
            unique_filename = f"{uuid.uuid4().hex}_{filename}"
            image_path = os.path.join(UPLOAD_FOLDER, unique_filename)
            image_file.save(image_path)

            # Save relative path to database for easy access
            image_path = os.path.relpath(image_path)
        else:
            return jsonify({'error': 'File type not allowed. Allowed types: png, jpg, jpeg, gif.'}), 400

    # Insert into database
    try:
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        cur.execute('''
            INSERT INTO lost_items (name, email, item_description, date_lost, image_path)
            VALUES (?, ?, ?, ?, ?)
        ''', (name, email, item_description, date_lost, image_path))
        conn.commit()
        conn.close()
    except Exception as e:
        print("Database error:", e)
        return jsonify({'error': 'Internal server error'}), 500

    return jsonify({'message': 'Item added!'}), 201

@app.route('/images/<path:filename>')
def uploaded_file(filename):
    # Safe serving of images
    return send_from_directory(UPLOAD_FOLDER, filename, as_attachment=False)

@app.route('/api/lost-items', methods=['GET'])
def get_lost_items():
    try:
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        items = conn.execute('SELECT * FROM lost_items').fetchall()
        conn.close()
        return jsonify([dict(ix) for ix in items])
    except Exception as e:
        print("Database error:", e)
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
