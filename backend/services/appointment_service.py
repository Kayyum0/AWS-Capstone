from repository.mock_db import db

class AppointmentService:
    def get_appointments(self, patient_id=None, doctor_name=None):
        if doctor_name:
             return db.get_appointments_by_doctor(doctor_name), 200
        # In a real app we'd verify the requesting user owns this data
        if patient_id:
            return db.get_appointments_by_patient(patient_id), 200
        return [], 200

    def create_appointment(self, patient_id, doctor_name, specialty, date, time):
        appointment = db.create_appointment({
            "patient_id": patient_id,
            "doctor": doctor_name,
            "specialty": specialty,
            "date": date,
            "time": time
        })
        return {"message": "Appointment booked successfully", "appointment": appointment}, 201

appointment_service = AppointmentService()
