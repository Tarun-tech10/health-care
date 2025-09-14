from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# File to store user data
USERS_FILE = 'users.json'

def load_users():
    print('Loading users from file')
    if os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'r') as f:
            users = json.load(f)
            print(f'Loaded {len(users.get("patients", [])) + len(users.get("doctors", []))} users')
            return users
    print('Users file not found, creating new user database')
    return {"patients": [], "doctors": []}

def save_users(users):
    print('Saving users to file')
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)
    print('Users saved successfully')

@app.route('/api/register', methods=['POST'])
def register():
    print('Received registration request')
    data = request.get_json()
    print(f'Registration data: {data}')
    
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('userType')
    
    if not all([name, email, password, user_type]):
        print('Missing required registration fields')
        return jsonify({"success": False, "message": "All fields are required"})
    
    users = load_users()
    user_list = users['patients'] if user_type == 'patient' else users['doctors']
    
    # Check if user already exists
    if any(user['email'] == email for user in user_list):
        print(f'User with email {email} already exists')
        return jsonify({"success": False, "message": "User already exists"})
    
    # Add new user
    new_user = {
        "name": name,
        "email": email,
        "password": password  # In production, this should be hashed
    }
    user_list.append(new_user)
    save_users(users)
    print(f'Successfully registered new {user_type}: {email}')
    
    return jsonify({"success": True, "message": "Registration successful", "name": name})

@app.route('/api/login', methods=['POST'])
def login():
    print('Received login request')
    data = request.get_json()
    print(f'Login data: {data}')
    
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('userType')
    
    if not all([email, password, user_type]):
        print('Missing required login fields')
        return jsonify({"success": False, "message": "All fields are required"})
    
    users = load_users()
    user_list = users['patients'] if user_type == 'patient' else users['doctors']
    
    # Find user
    user = next((user for user in user_list if user['email'] == email and user['password'] == password), None)
    
    if user:
        print(f'Login successful for {email}')
        return jsonify({"success": True, "message": "Login successful", "name": user['name']})
    else:
        print(f'Login failed for {email}')
        return jsonify({"success": False, "message": "Invalid credentials"})

if __name__ == '__main__':
    print('Starting Flask server...')
    app.run(debug=True)