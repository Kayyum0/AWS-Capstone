import boto3
import os

def create_tables():
    region_name = os.environ.get('AWS_DEFAULT_REGION', 'us-east-1')
    dynamodb = boto3.resource('dynamodb', region_name=region_name)
    
    tables = [
        {
            'TableName': 'Health_Users',
            'KeySchema': [{'AttributeName': 'email', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'email', 'AttributeType': 'S'}],
            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        },
        {
            'TableName': 'Health_Appointments',
            'KeySchema': [{'AttributeName': 'id', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'id', 'AttributeType': 'S'}],
            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        },
        {
            'TableName': 'Health_MedicalRecords',
            'KeySchema': [{'AttributeName': 'id', 'KeyType': 'HASH'}],
            'AttributeDefinitions': [{'AttributeName': 'id', 'AttributeType': 'S'}],
            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
        }
    ]
    
    for table_config in tables:
        table_name = table_config['TableName']
        try:
            print(f"Creating table {table_name}...")
            table = dynamodb.create_table(**table_config)
            table.wait_until_exists()
            print(f"Table {table_name} created successfully.")
        except Exception as e:
            if "ResourceInUseException" in str(e):
                print(f"Table {table_name} already exists.")
            else:
                print(f"Error creating table {table_name}: {e}")

if __name__ == "__main__":
    create_tables()
