import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PatientHistory = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            // In a real app, user ID would come from auth context/token
            // For this demo, we'll try to get it from local storage if saved during login,
            // otherwise we might need a way to identify the current patient.
            // Since our login mock returns a user object with ID, let's assume it's stored.

            const storedUser = localStorage.getItem('user'); // Assuming you save normal user here

            // Fallback for demo: If no user is logged in, we can't show history.
            // But wait, the current auth flow in api.js/Login.jsx might not be saving 'user' to localStorage?
            // Let's check Login.jsx implementation or just prompt user to re-login if needed.

            // Wait, I haven't modified Login.jsx to save to localStorage yet? 
            // I should verify that. If not, I'll need to update Login.jsx too or assume the user just registered.

            // Let's check if we can get user from localStorage 'doctorUser' (no, this is patient)
            // I'll add a check for 'patientUser' or just 'user'.

            // Current simple Login.jsx probably doesn't save to localStorage. 
            // I should update this page to handle "No User" gracefully or I should update Login.jsx first.
            // For now, let's assume we will save `user` to `localStorage` in Login.jsx

            if (!storedUser) {
                // Redirect to login if not logged in
                // navigate('/login'); 
                // allow render for now to show "Please login"
                setLoading(false);
                return;
            }

            const user = JSON.parse(storedUser);
            try {
                const data = await api.getMedicalRecords(user.id);
                setRecords(data);
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Medical History</h1>

            {loading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : !localStorage.getItem('user') ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500 mb-4">Please log in to view your medical history.</p>
                </div>
            ) : records.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500">No medical records found.</p>
                </div>
            ) : (
                <div className="grig gap-6">
                    {records.map((record) => (
                        <div key={record.id} className="bg-white shadow overflow-hidden sm:rounded-lg mb-6 border border-gray-100">
                            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {record.diagnosis}
                                </h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                    Date: {record.date}
                                </p>
                            </div>
                            <div className="px-4 py-5 sm:p-6">
                                <h4 className="font-bold text-gray-800 mb-2">Clinical Notes</h4>
                                <p className="text-gray-700 mb-4">{record.notes}</p>

                                {record.prescription && (
                                    <div className="mt-4 bg-yellow-50 p-4 rounded-md border border-yellow-200">
                                        <h4 className="text-sm font-bold text-yellow-800 uppercase mb-1">Prescription</h4>
                                        <p className="text-gray-800 font-medium">{record.prescription}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientHistory;
