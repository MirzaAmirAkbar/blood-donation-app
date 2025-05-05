import React, { useState, useEffect } from 'react';
import '../styles/ViewBloodRequestsPage.css';
import { useNavigate } from 'react-router-dom';

const ViewBloodRequests = () => {
  const [bloodRequests, setBloodRequests] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBloodRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blood-request/blood-requests');
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

  const handleConfirmAppointment = async (requestId) => {
    const donorId = storedUser.email;
  
    if (!donorId) {
      alert('You must be logged in to make an appointment.');
      return;
    }
  
    if (!appointmentTime) {
      alert('Please select an appointment time');
      return;
    }
  
    try {
      // 1. Create the appointment
      const appointmentResponse = await fetch('http://localhost:5000/api/appointment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donorId,
          bloodRequestId: requestId,
          appointment_time: appointmentTime,
        }),
      });
  
      const appointmentData = await appointmentResponse.json();
  
      if (!appointmentResponse.ok) {
        alert('Error creating appointment: ' + appointmentData.error);
        return;
      }
      else {
        alert('appointment created');
      }
      /*
      // 2. Update blood request status
      const confirmResponse = await fetch(`http://localhost:5000/api/blood-request/confirm/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointment_time: appointmentTime }),
      });
  
      const confirmData = await confirmResponse.json();
  
      if (confirmResponse.ok) {
        alert('Appointment confirmed!');
        setBloodRequests(bloodRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: 'confirmed', appointment_time: appointmentTime }
            : request
        ));
      } else {
        alert('Appointment created but error updating blood request: ' + confirmData.message);
      }
    */
    } catch (error) {
      console.error('Error confirming appointment:', error);
      alert('An error occurred during appointment confirmation.');
    }
  };
  

  return (
    <div className="view-blood-requests-container">
      <h2>View Blood Requests</h2>
      <button className="back-button" onClick={() => window.history.back()}>Back to Dashboard</button>
      <div className="requests-list">
        {bloodRequests.map((request) => (
          <div className="request-card" key={request._id}>
            <h3>Blood Type: {request.blood_type}</h3>
            <p>Requester: {request.requester_name}</p>
            <p>Contact: {request.contact_info}</p>
            <p>Urgency: {request.urgency}</p>
            <p>Hospital: {request.hospital_name}</p>
            <p>Status: <span className={`status-${request.status}`}>{request.status}</span></p>
            <p>Date of Request: {new Date(request.request_date).toLocaleString()}</p>
            {request.status === 'pending' && (
              <div>
                <label htmlFor="appointment-time">Select Appointment Time:</label>
                <input
                  type="datetime-local"
                  id="appointment-time"
                  value={appointmentTime}
                  onChange={handleAppointmentChange}
                />
                <button
                  className="confirm-button"
                  onClick={() => handleConfirmAppointment(request._id)}
                >
                  Confirm Appointment
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBloodRequests;
