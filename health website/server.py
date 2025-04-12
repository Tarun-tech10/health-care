from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# In a real application, you would use a proper database
# For this example, we'll use a simple JSON file to store user data
USERS_FILE = 'users.json'

def load_users():
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    return {'patients': [], 'doctors': []}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    users = load_users()
    
    # Check if user already exists
    for user in users[data['userType'] + 's']:
        if user['email'] == data['email']:
            return jsonify({'success': False, 'message': 'User already exists'})
    
    # Add new user
    new_user = {
        'id': len(users[data['userType'] + 's']) + 1,
        'name': data['name'],
        'email': data['email'],
        'password': data['password']  # In a real app, you should hash passwords
    }
    
    users[data['userType'] + 's'].append(new_user)
    save_users(users)
    
    return jsonify({'success': True, 'message': 'Registration successful'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    users = load_users()
    
    # Search for user in the appropriate collection
    user_type = data['userType'] + 's'
    for user in users[user_type]:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'id': user['id'],
                'name': user['name']
            })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=True, port=5000) 