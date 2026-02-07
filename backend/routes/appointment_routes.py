from flask import Blueprint, request, jsonify
from services.appointment_service import appointment_service

appointment_bp = Blueprint('appointments', __name__)

@appointment_bp.route('/', methods=['GET'])
def get_appointments():
    # In real app, get patient_id from JWT token context
    patient_id = request.args.get('patientId')
    doctor_id = request.args.get('doctorId')
    response, status = appointment_service.get_appointments(patient_id, doctor_id=doctor_id)
    return jsonify(response), status

@appointment_bp.route('/', methods=['POST'])
def create_appointment():
    data = request.json
    response, status = appointment_service.create_appointment(
        patient_id=data.get('patientId'),
        doctor_id=data.get('doctorId'),
        doctor_name=data.get('doctorName'),
        specialty=data.get('specialty'),
        date=data.get('date'),
        time=data.get('time')
    )
    return jsonify(response), status
