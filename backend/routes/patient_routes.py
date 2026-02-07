from flask import Blueprint, jsonify, request
from services.patient_service import patient_service

patient_bp = Blueprint('patients', __name__)

@patient_bp.route('/<patient_id>/records', methods=['GET'])
def get_medical_records(patient_id):
    response, status = patient_service.get_medical_records(patient_id)
    return jsonify(response), status

@patient_bp.route('/<patient_id>/records', methods=['POST'])
def add_medical_record(patient_id):
    data = request.json
    response, status = patient_service.add_medical_record(patient_id, data)
    return jsonify(response), status

@patient_bp.route('/', methods=['GET'])
def get_all_patients():
    response, status = patient_service.get_all_patients()
    return jsonify(response), status
