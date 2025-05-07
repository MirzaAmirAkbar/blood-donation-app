// frontend/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ManageProfilePage from './pages/ManageProfilePage';
import RequestBloodPage from './pages/RequestBloodPage';
import ViewBloodRequestsPage from './pages/ViewBloodRequestsPage';
import MyRequestsPage from './pages/MyRequestsPage';
import MyAppointmentsPage from './pages/MyAppointmentsPage';
import NotificationsPage from './pages/NotificationsPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/manage-profile" element={<ManageProfilePage />} />
        <Route path="/request-blood" element={<RequestBloodPage />} />
        <Route path="/view-requests" element={<ViewBloodRequestsPage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/my-appointments" element={<MyAppointmentsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        {/* You can add a Register page here */}
      </Routes>
    </Router>
  );
};

export default App;
