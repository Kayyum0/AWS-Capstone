from flask import Flask, jsonify
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.appointment_routes import appointment_bp
from routes.patient_routes import patient_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
app.register_blueprint(patient_bp, url_prefix='/api/patients')

@app.route('/')
def home():
    return jsonify({"message": "Healthcare Portal API is running", "status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
