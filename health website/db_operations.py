import sqlite3
from datetime import datetime
from db_config import get_db_connection
import hashlib

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Patient Operations
def add_patient(name, email, password, date_of_birth=None, gender=None, phone=None, address=None, medical_history=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO patients (name, email, password, date_of_birth, gender, phone, address, medical_history)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, email, hash_password(password), date_of_birth, gender, phone, address, medical_history))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def get_patient_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM patients WHERE email = ?', (email,))
    patient = cursor.fetchone()
    conn.close()
    return patient

def update_patient(patient_id, **kwargs):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        update_fields = []
        values = []
        for key, value in kwargs.items():
            if key == 'password' and value:
                value = hash_password(value)
            update_fields.append(f"{key} = ?")
            values.append(value)
        
        values.append(patient_id)
        query = f"UPDATE patients SET {', '.join(update_fields)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        return True
    except Exception as e:
        return False
    finally:
        conn.close()

# Doctor Operations
def add_doctor(name, email, password, specialization, qualification, experience, phone=None, address=None, license_number=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO doctors (name, email, password, specialization, qualification, experience, phone, address, license_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, email, hash_password(password), specialization, qualification, experience, phone, address, license_number))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def get_doctor_by_email(email):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM doctors WHERE email = ?', (email,))
    doctor = cursor.fetchone()
    conn.close()
    return doctor

def update_doctor(doctor_id, **kwargs):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        update_fields = []
        values = []
        for key, value in kwargs.items():
            if key == 'password' and value:
                value = hash_password(value)
            update_fields.append(f"{key} = ?")
            values.append(value)
        
        values.append(doctor_id)
        query = f"UPDATE doctors SET {', '.join(update_fields)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        return True
    except Exception as e:
        return False
    finally:
        conn.close()

# Appointment Operations
def create_appointment(patient_id, doctor_id, appointment_date, appointment_time, notes=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, notes)
            VALUES (?, ?, ?, ?, ?)
        ''', (patient_id, doctor_id, appointment_date, appointment_time, notes))
        conn.commit()
        return True
    except Exception as e:
        return False
    finally:
        conn.close()

def get_patient_appointments(patient_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT a.*, d.name as doctor_name, d.specialization
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date, a.appointment_time
    ''', (patient_id,))
    appointments = cursor.fetchall()
    conn.close()
    return appointments

def get_doctor_appointments(doctor_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT a.*, p.name as patient_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        WHERE a.doctor_id = ?
        ORDER BY a.appointment_date, a.appointment_time
    ''', (doctor_id,))
    appointments = cursor.fetchall()
    conn.close()
    return appointments

# Prescription Operations
def create_prescription(patient_id, doctor_id, medication, dosage, frequency, duration, instructions=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO prescriptions (patient_id, doctor_id, prescription_date, medication, dosage, frequency, duration, instructions)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (patient_id, doctor_id, datetime.now().date(), medication, dosage, frequency, duration, instructions))
        conn.commit()
        return True
    except Exception as e:
        return False
    finally:
        conn.close()

def get_patient_prescriptions(patient_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT p.*, d.name as doctor_name
        FROM prescriptions p
        JOIN doctors d ON p.doctor_id = d.id
        WHERE p.patient_id = ?
        ORDER BY p.prescription_date DESC
    ''', (patient_id,))
    prescriptions = cursor.fetchall()
    conn.close()
    return prescriptions

# Medical Records Operations
def add_medical_record(patient_id, doctor_id, diagnosis, treatment, notes=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO medical_records (patient_id, doctor_id, record_date, diagnosis, treatment, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (patient_id, doctor_id, datetime.now().date(), diagnosis, treatment, notes))
        conn.commit()
        return True
    except Exception as e:
        return False
    finally:
        conn.close()

def get_patient_medical_records(patient_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT m.*, d.name as doctor_name
        FROM medical_records m
        JOIN doctors d ON m.doctor_id = d.id
        WHERE m.patient_id = ?
        ORDER BY m.record_date DESC
    ''', (patient_id,))
    records = cursor.fetchall()
    conn.close()
    return records 