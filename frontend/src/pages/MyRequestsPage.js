import React, { useState, useEffect } from 'react';
import '../styles/MyRequestsPage.css';

import { useNavigate } from 'react-router-dom';

const MyRequests = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [requests, setRequests] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-request/blood-requests-email?email=${storedUser.email}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-request/blood-request-delete/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchRequests();
      } else {
        alert('Delete failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleUpdate = async (id) => {
    const quantity = parseFloat(editedData[id]?.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Quantity must be a positive number.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/blood-request/blood-request-update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData[id]),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setEditingId(null);
        fetchRequests();
      } else {
        alert('Update failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };
  

  const handleEditChange = (id, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  return (
    <div className="my-requests-container">
      <div className="my-requests-card">
        <h1>My Blood Requests</h1>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((request) => (
            <div className="request-entry" key={request._id}>
              <p><strong>Blood Type:</strong> {request.blood_type}</p>
              <p><strong>Status:</strong> {request.status}</p>

              {editingId === request._id ? (
                <>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={editedData[request._id]?.quantity || request.quantity}
                    onChange={(e) => handleEditChange(request._id, 'quantity', e.target.value)}
                  />

                  <label>Urgency:</label>
                  <select
                    value={editedData[request._id]?.urgency || request.urgency}
                    onChange={(e) => handleEditChange(request._id, 'urgency', e.target.value)}
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="low">Low</option>
                  </select>

                  <label>Hospital Name:</label>
                  <input
                    type="text"
                    value={editedData[request._id]?.hospital_name || request.hospital_name}
                    onChange={(e) => handleEditChange(request._id, 'hospital_name', e.target.value)}
                  />

                  <div className="button-group">
                    <button className="btn primary" onClick={() => handleUpdate(request._id)}>Save</button>
                    <button className="btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p><strong>Quantity:</strong> {request.quantity} L</p>
                  <p><strong>Urgency:</strong> {request.urgency}</p>
                  <p><strong>Hospital:</strong> {request.hospital_name}</p>

                  <div className="button-group">
                    <button className="btn primary" onClick={() => {
                      setEditingId(request._id);
                      setEditedData((prev) => ({
                        ...prev,
                        [request._id]: {
                          quantity: request.quantity,
                          urgency: request.urgency,
                          hospital_name: request.hospital_name,
                        }
                      }));
                    }}>Update</button>
                    <button className="btn" onClick={() => handleDelete(request._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
        <button className="btn primary back-button" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MyRequests;
