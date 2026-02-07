from flask import Blueprint, request, jsonify
from services.auth_service import auth_service

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    response, status = auth_service.register(
        data.get('email'), 
        data.get('password'), 
        data.get('fullName')
    )
    return jsonify(response), status

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    response, status = auth_service.login(
        data.get('email'), 
        data.get('password')
    )
    return jsonify(response), status
