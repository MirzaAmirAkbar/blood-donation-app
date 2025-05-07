import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAppointmentsPage.css'; // Make sure this is included

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser?.email;

  useEffect(() => {
    if (!userEmail) {
      alert('Problem with email');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/appointment/user/${userEmail}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Failed to load appointments:', err));
  }, [userEmail]);

  return (
    <div className="appointments-container">
      <div className="appointments-card">
        <h1 className="appointments-title">My Appointments</h1>

        {appointments.length === 0 ? (
          <p className="appointments-empty">You have no appointments yet.</p>
        ) : (
          <div className="appointments-list">
            {appointments.map(app => {
              const bloodRequest = app.bloodRequest;

              return (
                <div className="appointment-card" key={app._id}>
                  <div className="appointment-header">
                    <span className="blood-tag">{bloodRequest?.blood_type}</span>
                    <span className="hospital-name">{bloodRequest?.hospital_name}</span>
                  </div>
                  <div className="appointment-details">
                    <p><strong>Requester:</strong> {bloodRequest?.requester_name}</p>
                    <p><strong>Contact:</strong> {bloodRequest?.contact_info}</p>
                    <p><strong>Urgency:</strong> {bloodRequest?.urgency}</p>
                    <p><strong>Date/Time:</strong> {(new Date(app.appointment_time)).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
