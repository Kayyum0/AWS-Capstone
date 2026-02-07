const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
    // Auth
    async register(userData) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    async login(credentials) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    // Appointments
    async getAppointments(patientId) {
        const response = await fetch(`${API_URL}/appointments/?patientId=${patientId}`);
        return response.json();
    },

    async createAppointment(appointmentData) {
        const response = await fetch(`${API_URL}/appointments/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData),
        });
        return response.json();
    },

    // Doctor
    async getDoctorAppointments(doctorId) {
        const response = await fetch(`${API_URL}/appointments/?doctorId=${doctorId}`);
        return response.json();
    },

    // Patient Records
    async getMedicalRecords(patientId) {
        const response = await fetch(`${API_URL}/patients/${patientId}/records`);
        return response.json();
    },

    async addMedicalRecord(patientId, recordData) {
        const response = await fetch(`${API_URL}/patients/${patientId}/records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recordData),
        });
        return response.json();
    },

    async getAllPatients() {
        const response = await fetch(`${API_URL}/patients/`);
        return response.json();
    },

    async getDoctors() {
        const response = await fetch(`${API_URL}/patients/doctors`);
        return response.json();
    }
};
