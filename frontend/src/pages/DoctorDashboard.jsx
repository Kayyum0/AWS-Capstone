import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AddRecordModal from '../components/AddRecordModal';
import { Users, Calendar, Search, FileText, User } from 'lucide-react';

const DoctorDashboard = () => {
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'patients'

    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('doctorUser');
        if (!storedUser) {
            navigate('/doctor/login');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        fetchData(parsedUser.full_name);
    }, [navigate]);

    const fetchData = async (doctorName) => {
        try {
            const apts = await api.getDoctorAppointments(doctorName);
            setAppointments(apts);

            const allPatients = await api.getAllPatients();
            setPatients(allPatients);
            setFilteredPatients(allPatients);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = patients.filter(p =>
            p.full_name.toLowerCase().includes(query) ||
            p.email.toLowerCase().includes(query)
        );
        setFilteredPatients(filtered);
    };

    const handlePatientClick = async (patientId) => {
        if (selectedPatientId === patientId) {
            // If clicking same patient, just ensure we are in view mode, maybe toggle? 
            // For now, let's keep it simple: always fetch to refresh
        }

        setSelectedPatientId(patientId);
        setLoadingRecords(true);
        try {
            const data = await api.getMedicalRecords(patientId);
            setMedicalRecords(data);
        } catch (error) {
            console.error("Failed to fetch records", error);
        } finally {
            setLoadingRecords(false);
        }
    };

    const handleAddRecord = async (recordData) => {
        try {
            await api.addMedicalRecord(selectedPatientId, recordData);
            setIsModalOpen(false);
            const data = await api.getMedicalRecords(selectedPatientId);
            setMedicalRecords(data);
        } catch (error) {
            console.error("Failed to add record", error);
            alert("Failed to add record");
        }
    };

    if (!user) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
                    <p className="text-slate-600 mt-1">Welcome back, Dr. {user.full_name}</p>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 w-full">
                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Total Patients</p>
                            <p className="text-2xl font-bold text-slate-900">{patients.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
                        <div className="p-3 bg-emerald-100 rounded-full mr-4">
                            <Calendar className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">Upcoming Appointments</p>
                            <p className="text-2xl font-bold text-slate-900">{appointments.filter(a => a.status === 'Upcoming').length}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Navigation & List */}
                    <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden flex flex-col h-[600px]">
                        {/* Tabs */}
                        <div className="flex border-b border-slate-200">
                            <button
                                className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setActiveTab('appointments')}
                            >
                                Appointments
                            </button>
                            <button
                                className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-500 hover:text-slate-700'}`}
                                onClick={() => setActiveTab('patients')}
                            >
                                Patient Database
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeTab === 'appointments' ? (
                                <ul className="space-y-3">
                                    {appointments.length === 0 ? (
                                        <p className="text-center text-slate-500 py-10">No appointments found.</p>
                                    ) : (
                                        appointments.map((apt) => (
                                            <li
                                                key={apt.id}
                                                className={`p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition ${selectedPatientId === apt.patient_id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                                                onClick={() => handlePatientClick(apt.patient_id)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-semibold text-slate-900">Patient ID: {apt.patient_id}</p>
                                                        <p className="text-sm text-slate-500">{apt.date} at {apt.time}</p>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                        {apt.status}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-sm text-slate-600">Reason: {apt.specialty}</span>
                                                    <span className="text-xs text-blue-600 font-medium">View Records →</span>
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            ) : (
                                <div>
                                    <div className="relative mb-4">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search by name or email..."
                                            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={searchQuery}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <ul className="space-y-3">
                                        {filteredPatients.length === 0 ? (
                                            <p className="text-center text-slate-500 py-10">No patients found.</p>
                                        ) : (
                                            filteredPatients.map((patient) => (
                                                <li
                                                    key={patient.id}
                                                    className={`p-4 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition ${selectedPatientId === patient.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                                                    onClick={() => handlePatientClick(patient.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-slate-100 p-2 rounded-full">
                                                            <User className="h-5 w-5 text-slate-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-900">{patient.full_name}</p>
                                                            <p className="text-sm text-slate-500">{patient.email}</p>
                                                        </div>
                                                        <button className="ml-auto text-xs font-medium text-blue-600 hover:text-blue-800">
                                                            View Records
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Patient Records */}
                    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-[600px]">
                        <div className="px-4 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                            <h3 className="font-semibold text-slate-900">
                                {selectedPatientId ? 'Medical Records' : 'Select Patient'}
                            </h3>
                            {selectedPatientId && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1.5 px-3 rounded transition-colors"
                                >
                                    + Add Record
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
                            {!selectedPatientId ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                    <FileText className="h-12 w-12 mb-2 opacity-50" />
                                    <p>Select a patient to view details</p>
                                </div>
                            ) : loadingRecords ? (
                                <div className="h-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : medicalRecords.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-slate-500">No records found.</p>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="mt-2 text-blue-600 font-medium hover:underline"
                                    >
                                        Create first record
                                    </button>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {medicalRecords.map((record) => (
                                        <li key={record.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-slate-800 text-sm">{record.diagnosis || 'General Checkup'}</h4>
                                                <span className="text-xs text-slate-500">{record.date}</span>
                                            </div>
                                            <p className="text-sm text-slate-700 mb-3">{record.notes}</p>
                                            {record.prescription && (
                                                <div className="mt-2 bg-yellow-50 p-2 rounded border border-yellow-200">
                                                    <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-wide mb-1">Prescription</p>
                                                    <p className="text-sm text-slate-800 font-medium">{record.prescription}</p>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <AddRecordModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddRecord}
                patientId={selectedPatientId}
            />
        </div>
    );
};

export default DoctorDashboard;
