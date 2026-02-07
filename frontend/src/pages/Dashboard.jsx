import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Mock data - replace with API call later
    const [appointments, setAppointments] = useState([
        { id: 1, doctor: 'Dr. Sarah Wilson', specialty: 'Cardiology', date: '2023-10-24', time: '10:00 AM', status: 'Upcoming' },
        { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Dermatology', date: '2023-11-05', time: '02:30 PM', status: 'Upcoming' },
        { id: 3, doctor: 'Dr. Emily Brooks', specialty: 'General Medicine', date: '2023-09-15', time: '09:15 AM', status: 'Completed' },
    ]);

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Patient Dashboard</h1>
                        <p className="text-slate-600">Welcome back, John Doe</p>
                    </div>
                    <Link to="/book-appointment" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
                        <Plus className="h-5 w-5 mr-2" />
                        New Appointment
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Upcoming Appointments</h3>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">2</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Recent Vitals</h3>
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <Clock className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">BP: 120/80</p>
                        <p className="text-sm text-slate-500">Last updated: 2 days ago</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-slate-500">Active Prescriptions</h3>
                            <div className="p-2 bg-violet-100 rounded-lg">
                                <User className="h-5 w-5 text-violet-600" />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">1</p>
                    </div>
                </div>

                {/* Appointments List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-900">My Appointments</h2>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative flex-grow sm:flex-grow-0">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search doctor..."
                                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                                />
                            </div>
                            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                                <Filter className="h-4 w-4 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialty</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {appointments.map((apt) => (
                                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3">
                                                    {apt.doctor.charAt(4)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-slate-900">{apt.doctor}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">{apt.specialty}</td>
                                        <td className="px-6 py-4 text-slate-600 text-sm">
                                            <div className="flex flex-col">
                                                <span>{apt.date}</span>
                                                <span className="text-xs text-slate-400">{apt.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium
                        ${apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-slate-100 text-slate-600'}`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                                                <MoreVertical className="h-4 w-4 text-slate-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
