import boto3
import uuid
import os
from boto3.dynamodb.conditions import Key, Attr
from .mock_db import BaseRepository

class DynamoDBRepository(BaseRepository):
    def __init__(self):
        region_name = os.environ.get('AWS_DEFAULT_REGION', 'us-east-1')
        self.dynamodb = boto3.resource('dynamodb', region_name=region_name)
        
        # Table Names
        self.users_table = self.dynamodb.Table('Health_Users')
        self.appointments_table = self.dynamodb.Table('Health_Appointments')
        self.medical_records_table = self.dynamodb.Table('Health_MedicalRecords')
        
        print(f"Initialized DynamoDB Repository in region {region_name}")

    def get_user_by_email(self, email):
        # Scan is inefficient for large datasets, but GSI is better. 
        # For simplicity in this capstone, we'll use scan or assume email is key if structure allows.
        # Ideally, email should be a GSI or the partition key. 
        # Let's assume email is partition key for Users table for simplicity, OR use Scan with filter.
        # Given BaseRepository signature implies email lookup, let's use Scan for now as it's flexible.
        try:
            response = self.users_table.scan(
                FilterExpression=Attr('email').eq(email)
            )
            items = response.get('Items', [])
            return items[0] if items else None
        except Exception as e:
            print(f"Error fetching user by email: {e}")
            return None

    def create_user(self, user_data):
        user_data['id'] = str(uuid.uuid4())
        self.users_table.put_item(Item=user_data)
        return user_data

    def get_appointments_by_patient(self, patient_id):
        # Using GSI 'patient_id-index' if it existed, or FilterExpression
        try:
            response = self.appointments_table.scan(
                FilterExpression=Attr('patient_id').eq(patient_id)
            )
            return response.get('Items', [])
        except Exception as e:
            print(f"Error fetching appointments: {e}")
            return []

    def create_appointment(self, appointment_data):
        appointment_data['id'] = str(uuid.uuid4())
        appointment_data['status'] = 'Upcoming'
        self.appointments_table.put_item(Item=appointment_data)
        return appointment_data

    def get_appointments_by_doctor(self, doctor_name):
        try:
            response = self.appointments_table.scan(
                FilterExpression=Attr('doctor').eq(doctor_name)
            )
            return response.get('Items', [])
        except Exception as e:
            print(f"Error fetching doctor appointments: {e}")
            return []

    def get_medical_records(self, patient_id):
        try:
            response = self.medical_records_table.scan(
                FilterExpression=Attr('patient_id').eq(patient_id)
            )
            return response.get('Items', [])
        except Exception as e:
            print(f"Error fetching medical records: {e}")
            return []

    def create_medical_record(self, record_data):
        record_data['id'] = str(uuid.uuid4())
        record_data['date'] = record_data.get('date', '2023-10-27')
        self.medical_records_table.put_item(Item=record_data)
        return record_data

    def get_all_patients(self):
        try:
            response = self.users_table.scan(
                FilterExpression=Attr('role').eq('patient')
            )
            return response.get('Items', [])
        except Exception as e:
            print(f"Error fetching patients: {e}")
            return []
