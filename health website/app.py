from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from db_operations import *
from db_config import init_db
import hashlib
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable CORS for all routes

# Initialize database
init_db()

# Serve static files
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('userType')

    if not all([email, password, user_type]):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    if user_type == 'patient':
        user = get_patient_by_email(email)
    else:
        user = get_doctor_by_email(email)

    if user and user['password'] == hashed_password:
        return jsonify({
            'success': True,
            'id': user['id'],
            'name': user['name'],
            'email': user['email']
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/api/register/patient', methods=['POST'])
def register_patient():
    data = request.json
    required_fields = ['name', 'email', 'password']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    success = add_patient(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        date_of_birth=data.get('date_of_birth'),
        gender=data.get('gender'),
        phone=data.get('phone'),
        address=data.get('address'),
        medical_history=data.get('medical_history')
    )

    if success:
        return jsonify({'success': True, 'message': 'Patient registered successfully'})
    return jsonify({'success': False, 'message': 'Email already exists'})

@app.route('/api/register/doctor', methods=['POST'])
def register_doctor():
    data = request.json
    required_fields = ['name', 'email', 'password', 'specialization', 'qualification', 'experience']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    success = add_doctor(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        specialization=data['specialization'],
        qualification=data['qualification'],
        experience=data['experience'],
        phone=data.get('phone'),
        address=data.get('address'),
        license_number=data.get('license_number')
    )

    if success:
        return jsonify({'success': True, 'message': 'Doctor registered successfully'})
    return jsonify({'success': False, 'message': 'Email or license number already exists'})

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    required_fields = ['patient_id', 'doctor_id', 'appointment_date', 'appointment_time']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    success = create_appointment(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        appointment_date=data['appointment_date'],
        appointment_time=data['appointment_time'],
        notes=data.get('notes')
    )

    if success:
        return jsonify({'success': True, 'message': 'Appointment created successfully'})
    return jsonify({'success': False, 'message': 'Failed to create appointment'})

@app.route('/api/prescriptions', methods=['POST'])
def create_prescription():
    data = request.json
    required_fields = ['patient_id', 'doctor_id', 'medication', 'dosage', 'frequency', 'duration']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    success = create_prescription(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        medication=data['medication'],
        dosage=data['dosage'],
        frequency=data['frequency'],
        duration=data['duration'],
        instructions=data.get('instructions')
    )

    if success:
        return jsonify({'success': True, 'message': 'Prescription created successfully'})
    return jsonify({'success': False, 'message': 'Failed to create prescription'})

@app.route('/api/medical-records', methods=['POST'])
def add_medical_record():
    data = request.json
    required_fields = ['patient_id', 'doctor_id', 'diagnosis', 'treatment']
    
    if not all(field in data for field in required_fields):
        return jsonify({'success': False, 'message': 'Missing required fields'})

    success = add_medical_record(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        diagnosis=data['diagnosis'],
        treatment=data['treatment'],
        notes=data.get('notes')
    )

    if success:
        return jsonify({'success': True, 'message': 'Medical record added successfully'})
    return jsonify({'success': False, 'message': 'Failed to add medical record'})

if __name__ == '__main__':
    app.run(debug=True) 