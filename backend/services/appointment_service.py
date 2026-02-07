from repository.mock_db import db
from services.notification_service import notification_service

class AppointmentService:
    def get_appointments(self, patient_id=None, doctor_id=None):
        if doctor_id:
             return db.get_appointments_by_doctor_id(doctor_id), 200
        # In a real app we'd verify the requesting user owns this data
        if patient_id:
            return db.get_appointments_by_patient(patient_id), 200
        return [], 200

    def create_appointment(self, patient_id, doctor_id, doctor_name, specialty, date, time):
        appointment = db.create_appointment({
            "patient_id": patient_id,
            "doctor_id": doctor_id,
            "doctor": doctor_name, # Keep name for display purposes if needed
            "specialty": specialty,
            "date": date,
            "time": time
        })
        
        # Send notification
        message = f"Appointment confirmed with {doctor_name} on {date} at {time}."
        notification_service.send_notification(message, "Appointment Confirmation")
        
        return {"message": "Appointment booked successfully", "appointment": appointment}, 201

appointment_service = AppointmentService()
