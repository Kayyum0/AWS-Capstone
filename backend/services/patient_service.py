from repository.mock_db import db

class PatientService:
    def get_medical_records(self, patient_id):
        return db.get_medical_records(patient_id), 200

    def add_medical_record(self, patient_id, record_data):
        record_data['patient_id'] = patient_id
        new_record = db.create_medical_record(record_data)
        return {"message": "Medical record added successfully", "record": new_record}, 201

    def get_all_patients(self):
        return db.get_all_patients(), 200

patient_service = PatientService()
