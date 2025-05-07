import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import '../styles/MyAppointmentsPage.css';

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [requestDetails, setRequestDetails] = useState({});
  const [editedTimes, setEditedTimes] = useState({});
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser.email;

  useEffect(() => {
    if (!userEmail) {
      alert('problem with email');
      return;
    }

    fetch(`/api/appointment/user/${userEmail}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        data.forEach(appointment => {
          fetch(`/api/blood-request/bloodrequest/${appointment.bloodRequest}`)
            .then(res => res.json())
            .then(bloodData => {
              setRequestDetails(prev => ({
                ...prev,
                [appointment._id]: bloodData
              }));
            });
        });
      })
      .catch(err => console.error('Failed to load appointments:', err));
  }, [userEmail]);

  const handleTimeChange = (id, value) => {
    setEditedTimes(prev => ({ ...prev, [id]: value }));
  };

  const handleUpdate = (id) => {
    const updatedTime = editedTimes[id];
    if (!updatedTime) return;

    fetch(`/api/appointment/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appointment_time: updatedTime }),
    })
      .then(res => res.json())
      .then(data => {
        setAppointments(prev =>
          prev.map(app => app._id === id ? { ...app, appointment_time: updatedTime } : app)
        );
        alert('Appointment updated successfully.');
      })
      .catch(err => {
        console.error('Update failed:', err);
        alert('Failed to update appointment.');
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    fetch(`/api/appointment/delete/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setAppointments(prev => prev.filter(app => app._id !== id));
        alert('Appointment deleted successfully.');
      })
      .catch(err => {
        console.error('Delete failed:', err);
        alert('Failed to delete appointment.');
      });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>My Appointments</h1>
        {appointments.length === 0 ? (
          <p className="dashboard-subtitle">You have no appointments yet.</p>
        ) : (
          appointments.map(app => {
            const details = requestDetails[app._id];
            return (
              <div className="appointment-item" key={app._id}>
                <h3>{details?.blood_type} - {details?.hospital_name}</h3>
                <p><strong>Requester:</strong> {details?.requester_name}</p>
                <p><strong>Urgency:</strong> {details?.urgency}</p>
                <p><strong>Current Time:</strong> {(new Date(app.appointment_time), 'PPpp')}</p>
                <input
                  type="datetime-local"
                  value={editedTimes[app._id] || ''}
                  onChange={(e) => handleTimeChange(app._id, e.target.value)}
                />
                <div className="dashboard-options">
                  <button onClick={() => handleUpdate(app._id)}>Update</button>
                  <button onClick={() => handleDelete(app._id)}>Delete</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointmentsPage;
