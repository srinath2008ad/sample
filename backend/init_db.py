import sqlite3

conn = sqlite3.connect('database.db')
c = conn.cursor()
c.execute('''
CREATE TABLE IF NOT EXISTS lost_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    item_description TEXT NOT NULL,
    date_lost TEXT NOT NULL,
    image_path TEXT
)
''')
conn.commit()
conn.close()
