import React, { useState, useEffect } from 'react';
import '../styles/ViewBloodRequestsPage.css';
import { useNavigate } from 'react-router-dom';

const ViewBloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState('');
  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-request/blood-requests`);
        const data = await response.json();
        setBloodRequests(data);
      } catch (error) {
        console.error('Error fetching blood requests:', error);
      }
    };
    fetchBloodRequests();
  }, []);

  const handleAppointmentChange = (e) => {
    setAppointmentTime(e.target.value);
  };

  const handleConfirmAppointment = async (requestId, bloodtype) => {
    const donorId = storedUser?.email;

    if (!donorId) {
      alert('You must be logged in to make an appointment.');
      return;
    }

    if (!appointmentTime) {
      alert('Please select an appointment time');
      return;
    }

    const appointmentDate = new Date(appointmentTime);
    const now = new Date();

    if (appointmentDate < now) {
      alert('Appointment time cannot be in the past.');
      return;
    }

    if (storedUser.blood_type !== bloodtype) {
      alert('Your Blood Type Does Not Match With Requester');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointment/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorId,
          bloodRequestId: requestId,
          appointment_time: appointmentTime,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert('Error: ' + data.error);
      } else {
        alert('Appointment created');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  // Filter blood requests to only include those with status 'pending'
  const pendingRequests = bloodRequests.filter(request => request.status === 'pending');

  return (
    <div className="view-blood-requests">
      <div className="header">
        <h2>Blood Requests</h2>
        <button className="back-btn" onClick={() => window.history.back()}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="requests-container">
        {pendingRequests.length > 0 ? (
          pendingRequests.map((req) => (
            <div className="request-card" key={req._id}>
              <h3>{req.blood_type} Blood Needed</h3>
              <ul>
                <li><strong>Requester:</strong> {req.requester_name}</li>
                <li><strong>Contact:</strong> {req.contact_info}</li>
                <li><strong>Urgency:</strong> {req.urgency}</li>
                <li><strong>Hospital:</strong> {req.hospital_name}</li>
                <li><strong>Status:</strong> <span className={`status ${req.status}`}>{req.status}</span></li>
                <li><strong>Request Date:</strong> {new Date(req.request_date).toLocaleString()}</li>
              </ul>

              <div className="appointment-form">
                <label htmlFor="appointment-time">Appointment Time</label>
                <input
                  type="datetime-local"
                  id="appointment-time"
                  value={appointmentTime}
                  onChange={handleAppointmentChange}
                  min={new Date().toISOString().slice(0, 16)} // Restrict to current and future times
                />
                <button
                  className="confirm-btn"
                  onClick={() => handleConfirmAppointment(req._id, req.blood_type)}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending blood requests available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewBloodRequests;
