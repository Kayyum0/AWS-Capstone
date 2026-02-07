import requests
import json
import time

BASE_URL = "http://127.0.0.1:5000/api"

def run_tests():
    print("Starting Enhancements Verification...")

    # 1. Register Patient
    print("\n1. Registering Patient...")
    patient_email = f"patient_{int(time.time())}@example.com"
    res = requests.post(f"{BASE_URL}/auth/register", json={
        "email": patient_email,
        "password": "password",
        "fullName": "Test Patient"
    })
    if res.status_code != 201:
        print(f"[FAIL] Registration failed: {res.text}")
        return
    patient_id = res.json()['user_id']
    print(f"[OK] Patient Registered: {patient_id}")

    # 2. Add Medical Record (Simulating Doctor Action)
    print("\n2. Doctor Adding Medical Record...")
    record_data = {
        "diagnosis": "Seasonal Flu",
        "notes": "Patient presented with fever and cough.",
        "prescription": "Paracetamol 500mg"
    }
    # Note: Our add_medical_record route currently doesn't enforce doctor auth in the mock, 
    # so we can call it directly. In a real app, we'd need a doctor token.
    res = requests.post(f"{BASE_URL}/patients/{patient_id}/records", json=record_data)
    if res.status_code == 201:
        print("[OK] Record Added")
    else:
        print(f"[FAIL] Failed to add record: {res.text}")

    # 3. View Medical History (Simulating Patient Action)
    print("\n3. Patient Viewing History...")
    res = requests.get(f"{BASE_URL}/patients/{patient_id}/records")
    if res.status_code == 200:
        records = res.json()
        if len(records) > 0 and records[0]['diagnosis'] == "Seasonal Flu":
            print("[OK] Record Verified in History")
        else:
            print(f"[FAIL] Record not found in history: {records}")
    else:
        print(f"[FAIL] Failed to fetch history: {res.text}")

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        print(f"[FAIL] Error: {e}")
