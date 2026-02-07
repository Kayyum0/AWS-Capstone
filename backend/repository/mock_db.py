import uuid
import os
from abc import ABC, abstractmethod

class BaseRepository(ABC):
    @abstractmethod
    def get_user_by_email(self, email):
        pass

    @abstractmethod
    def create_user(self, user_data):
        pass

    @abstractmethod
    def get_appointments_by_patient(self, patient_id):
        pass
        
    @abstractmethod
    def create_appointment(self, appointment_data):
        pass

class MockRepository(BaseRepository):
    def __init__(self):
        self.medical_records = []
        self.appointments = []
        # Seed a default doctor
        self.users = [{
            "id": "doctor-id-1",
            "email": "doctor@example.com",
            "password": "password123",
            "full_name": "Dr. Smith",
            "role": "doctor"
        }]
        print("Initialized Mock Repository with in-memory storage")

    def get_user_by_email(self, email):
        return next((u for u in self.users if u['email'] == email), None)

    def create_user(self, user_data):
        user_data['id'] = str(uuid.uuid4())
        self.users.append(user_data)
        return user_data

    def get_appointments_by_patient(self, patient_id):
        return [apt for apt in self.appointments if apt['patient_id'] == patient_id]
        
    def create_appointment(self, appointment_data):
        appointment_data['id'] = str(uuid.uuid4())
        appointment_data['status'] = 'Upcoming'
        self.appointments.append(appointment_data)
        return appointment_data

    def get_appointments_by_doctor(self, doctor_name):
        return [apt for apt in self.appointments if apt.get('doctor') == doctor_name]

    def get_medical_records(self, patient_id):
        return [rec for rec in self.medical_records if rec['patient_id'] == patient_id]

    def create_medical_record(self, record_data):
        record_data['id'] = str(uuid.uuid4())
        record_data['date'] = record_data.get('date', '2023-10-27')
        self.medical_records.append(record_data)
        return record_data

    def get_all_patients(self):
        return [u for u in self.users if u.get('role') == 'patient']

# Singleton instance
if os.environ.get('USE_AWS') == 'True':
    from .dynamo_db import DynamoDBRepository
    db = DynamoDBRepository()
else:
    db = MockRepository()
