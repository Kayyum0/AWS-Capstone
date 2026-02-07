import os
import sys
import boto3
from moto import mock_aws

# SET ENV VARS BEFORE IMPORTING APP
os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
os.environ['AWS_SECURITY_TOKEN'] = 'testing'
os.environ['AWS_SESSION_TOKEN'] = 'testing'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'
os.environ['USE_AWS'] = 'True' # Force app to use DynamoDB path

# Start Moto Mock
mock = mock_aws()
mock.start()

# Import App (after mock setup)
# We need to make sure 'app.py' can be imported. 
# Assuming 'app.py' is in 'backend/' and this script is also in 'backend/'
from app import app
from repository.dynamo_db import DynamoDBRepository

def setup_infrastructure():
    print(">>> Creating Mocked AWS Resources (DynamoDB Tables)...")
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    # Users Table
    dynamodb.create_table(
        TableName='Health_Users',
        KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'},
            # {'AttributeName': 'email', 'AttributeType': 'S'} # GSI definition if needed
        ],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )
    
    # Appointments Table
    dynamodb.create_table(
        TableName='Health_Appointments',
        KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'},
            {'AttributeName': 'patient_id', 'AttributeType': 'S'},
            {'AttributeName': 'doctor', 'AttributeType': 'S'}
        ],
        GlobalSecondaryIndexes=[
            {
                'IndexName': 'patient_id-index',
                'KeySchema': [{'AttributeName': 'patient_id', 'KeyType': 'HASH'}],
                'Projection': {'ProjectionType': 'ALL'},
                'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
            }
        ],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Medical Records Table
    dynamodb.create_table(
        TableName='Health_MedicalRecords',
        KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
        AttributeDefinitions=[
            {'AttributeName': 'id', 'AttributeType': 'S'},
            {'AttributeName': 'patient_id', 'AttributeType': 'S'}
        ],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    print(">>> Tables Created: Health_Users, Health_Appointments, Health_MedicalRecords")
    
    # Seed Data (Optional, but good for reliable testing)
    users_table = dynamodb.Table('Health_Users')
    # Default Doctor
    users_table.put_item(Item={
        'id': 'doctor-id-1',
        'email': 'doctor@example.com', 
        'password': 'password123',
        'full_name': 'Dr. Smith',
        'role': 'doctor'
    })
    # Default Patient
    users_table.put_item(Item={
        'id': 'patient-id-1',
        'email': 'john@example.com',
        'password': 'password',
        'full_name': 'John Doe',
        'role': 'patient'
    })
    
    print(">>> Seeded Default Doctor (doctor@example.com) and Patient (john@example.com)")

if __name__ == '__main__':
    try:
        setup_infrastructure()
        print("\n>>> Starting Flask Server with MOCK AWS INFRASTRUCTURE")
        print(">>> Stop with CTRL+C.")
        # use_reloader=False prevents spawning a new process that loses mock state
        app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
    finally:
        mock.stop()
