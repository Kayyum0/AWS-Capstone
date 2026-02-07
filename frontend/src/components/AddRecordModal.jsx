import React, { useState } from 'react';

const AddRecordModal = ({ isOpen, onClose, onSubmit, patientId }) => {
    const [diagnosis, setDiagnosis] = useState('');
    const [notes, setNotes] = useState('');
    const [prescription, setPrescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ diagnosis, notes, prescription });
        // Reset form
        setDiagnosis('');
        setNotes('');
        setPrescription('');
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-xl w-96">
                <h2 className="text-xl font-bold mb-4">Add Medical Record</h2>
                <p className="text-sm text-gray-500 mb-4">Patient ID: {patientId}</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Diagnosis</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Clinical Notes</label>
                        <textarea
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            rows="3"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Prescription</label>
                        <textarea
                            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                            rows="2"
                            value={prescription}
                            onChange={(e) => setPrescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddRecordModal;
