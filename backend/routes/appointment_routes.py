from flask import Blueprint, request, jsonify
from services.appointment_service import appointment_service

appointment_bp = Blueprint('appointments', __name__)

@appointment_bp.route('/', methods=['GET'])
def get_appointments():
    # In real app, get patient_id from JWT token context
    patient_id = request.args.get('patientId')
    doctor_name = request.args.get('doctor')
    response, status = appointment_service.get_appointments(patient_id, doctor_name)
    return jsonify(response), status

@appointment_bp.route('/', methods=['POST'])
def create_appointment():
    data = request.json
    response, status = appointment_service.create_appointment(
        data.get('patientId'),
        data.get('doctor'),
        data.get('specialty'),
        data.get('date'),
        data.get('time')
    )
    return jsonify(response), status
