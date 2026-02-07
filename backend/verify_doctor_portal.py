import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def test_endpoints():
    print("Testing Backend Endpoints...")
    
    # 1. Register a Patient
    print("\n1. Registering Patient...")
    patient_data = {
        "email": "patient@example.com",
        "password": "password123",
        "fullName": "John Doe"
    }
    res = requests.post(f"{BASE_URL}/auth/register", json=patient_data)
    if res.status_code == 201:
        patient_id = res.json()['user_id']
        print(f"[OK] Patient Registered: {patient_id}")
    else:
        print(f"[FAIL] Failed to register patient: {res.text}")
        return

    # 2. Create Appointment
    print("\n2. Creating Appointment...")
    apt_data = {
        "patientId": patient_id,
        "doctor": "Dr. Smith",
        "specialty": "Cardiology",
        "date": "2023-10-27",
        "time": "10:00 AM"
    }
    res = requests.post(f"{BASE_URL}/appointments/", json=apt_data)
    if res.status_code == 201:
        print("[OK] Appointment Created")
    else:
        print(f"[FAIL] Failed to create appointment: {res.text}")

    # 3. Get Appointments for Doctor
    print("\n3. Fetching Doctor Appointments...")
    res = requests.get(f"{BASE_URL}/appointments/?doctor=Dr. Smith")
    if res.status_code == 200 and len(res.json()) > 0:
        print("[OK] Doctor Appointments Fetched")
    else:
        print(f"[FAIL] Failed to fetch doctor appointments: {res.text}")

    # 4. Create Medical Record (Directly via MockDB access? No, let's skip seeding record via API for now as I didn't verify a create route, only get.
    print("\n4. Fetching Medical Records (Expected Empty)...")
    res = requests.get(f"{BASE_URL}/patients/{patient_id}/records")
    if res.status_code == 200:
        print("[OK] Medical Records Endpoint Accessible")
    else:
        print(f"[FAIL] Failed to fetch records: {res.text}")

if __name__ == "__main__":
    try:
        test_endpoints()
    except Exception as e:
        print(f"[FAIL] Verification failed: {e}")
