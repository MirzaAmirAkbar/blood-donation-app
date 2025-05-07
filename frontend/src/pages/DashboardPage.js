// frontend/pages/DashboardPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Welcome to Your Dashboard</h1>
        <p className="dashboard-subtitle">Manage everything related to your blood donation journey</p>
        <div className="dashboard-options">
          <button onClick={() => navigate('/manage-profile')}>Manage Profile</button>
          <button onClick={() => navigate('/request-blood')}>Request Blood</button>
          <button onClick={() => navigate('/my-requests')}>My Requests</button>
          <button onClick={() => navigate('/view-requests')}>View Blood Requests</button>
          <button onClick={() => navigate('/my-appointments')}>My Appointments</button>
          <button onClick={() => navigate('/notifications')}>Notifications</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
