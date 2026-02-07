import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';

import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientHistory from './pages/PatientHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="patient/history" element={<PatientHistory />} />

          {/* Doctor Portal Routes */}
          <Route path="doctor/login" element={<DoctorLogin />} />
          <Route path="doctor/dashboard" element={<DoctorDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
