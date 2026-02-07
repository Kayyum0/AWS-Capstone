import boto3
import os

class NotificationService:
    def __init__(self):
        self.sns = None
        self.topic_arn = os.environ.get('AWS_SNS_TOPIC_ARN')
        self.region = os.environ.get('AWS_DEFAULT_REGION', 'us-east-1')
        
        if os.environ.get('USE_AWS') == 'True':
            try:
                self.sns = boto3.client('sns', region_name=self.region)
                print(f"Notification Service initialized with SNS in {self.region}")
            except Exception as e:
                print(f"Failed to initialize SNS: {e}")

    def send_notification(self, message, subject="MedTrack Notification"):
        """
        Sends a notification via SNS if available, otherwise prints to console.
        In a real scenario, this would send an SMS or Email to the patient.
        """
        if self.sns and self.topic_arn:
            try:
                self.sns.publish(
                    TopicArn=self.topic_arn,
                    Message=message,
                    Subject=subject
                )
                print(f"SNS Notification sent: {subject}")
                return True
            except Exception as e:
                print(f"Error sending SNS notification: {e}")
                return False
        else:
            # Mock notification
            print("--------------------------------------------------")
            print(f"[MOCK NOTIFICATION] Subject: {subject}")
            print(f"Message: {message}")
            print("--------------------------------------------------")
            return True

notification_service = NotificationService()
