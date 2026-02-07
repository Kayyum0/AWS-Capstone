import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    // Mock data
    // Mock data replaced with real data fetch
    const [doctors, setDoctors] = useState([]);

    React.useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await api.getDoctors();
                // Map backend user fields to frontend expectation if needed, or just use as is
                // Backend returns: { full_name, role, specialization, ... }
                // Frontend expects: { id, name, specialty, availability }
                const mappedDoctors = data.map(d => ({
                    id: d.id,
                    name: d.full_name, // Backend uses full_name
                    specialty: d.specialization || 'General',
                    availability: 'Mon-Fri' // Hardcoded for now as backend doesn't have it
                }));
                setDoctors(mappedDoctors);
            } catch (error) {
                console.error("Failed to fetch doctors", error);
            }
        };
        fetchDoctors();
    }, []);

    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

    const handleSubmit = async () => {
        try {
            const appointmentData = {
                patientId: "test-patient-id", // Mock ID, real app would get from context
                doctorId: selectedDoctor.id,
                doctorName: selectedDoctor.name,
                specialty: selectedDoctor.specialty,
                date: selectedDate,
                time: selectedTime
            };
            const response = await api.createAppointment(appointmentData);
            if (response.appointment) {
                alert('Appointment booked successfully!');
                navigate('/dashboard');
            } else {
                alert('Booking failed');
            }
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to book appointment');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 flex items-center gap-4">
                    <Link to="/dashboard" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6 text-slate-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Book Appointment</h1>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 flex justify-between items-center relative">
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 transition-colors ${step >= s ? 'bg-blue-600 border-blue-100 text-white' : 'bg-white border-slate-200 text-slate-400'
                            }`}>
                            {s}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">

                    {/* Step 1: Select Doctor */}
                    {step === 1 && (
                        <div className="p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Select a Specialist</h2>
                            <div className="grid gap-4">
                                {doctors.map((doc) => (
                                    <button
                                        key={doc.id}
                                        onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                                        className="flex items-center p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                                    >
                                        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4 group-hover:bg-blue-200">
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{doc.name}</h3>
                                            <p className="text-sm text-slate-500">{doc.specialty}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Select Date & Time */}
                    {step === 2 && (
                        <div className="p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Choose Date & Time</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>

                            {selectedDate && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Available Slots</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {timeSlots.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`p-3 rounded-lg text-sm font-medium border transition-all ${selectedTime === time
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex justify-between">
                                <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-medium">Back</button>
                                <button
                                    disabled={!selectedDate || !selectedTime}
                                    onClick={() => setStep(3)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Confirm Booking</h2>
                            <p className="text-slate-500 mb-8">Please review your appointment details below.</p>

                            <div className="bg-slate-50 p-6 rounded-xl text-left max-w-sm mx-auto mb-8 border border-slate-100">
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-500">Doctor</span>
                                    <span className="font-semibold text-slate-900">{selectedDoctor?.name}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-500">Date</span>
                                    <span className="font-semibold text-slate-900">{selectedDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Time</span>
                                    <span className="font-semibold text-slate-900">{selectedTime}</span>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <button onClick={() => setStep(2)} className="text-slate-500 hover:text-slate-800 font-medium">Back</button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
                                >
                                    Confirm Appointment
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
