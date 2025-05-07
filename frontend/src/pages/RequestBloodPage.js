import React, { useState, useEffect } from 'react';
import '../styles/RequestBloodPage.css';

import { useNavigate } from 'react-router-dom';

const RequestBlood = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    blood_type: storedUser.blood_type,
    quantity: '',
    requester_name: storedUser.name,
    contact_info: storedUser.contact_info,
    email: storedUser.email, // <-- New field
    urgency: 'normal',
    hospital_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate quantity
    const quantity = parseFloat(formData.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      alert('Quantity must be a positive number.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/blood-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Blood request created successfully!');
        navigate('/dashboard');
      } else {
        alert('Error creating blood request: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the request.');
    }
  };
  

  return (
    <div className="request-blood-container">
      <div className="request-card">
        <h1>Request Blood</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="blood_type">Blood Type</label>
            <p id="blood_type" className="plain-text">{formData.blood_type}</p>
          </div>
  
          <div className="form-group">
            <label htmlFor="quantity">Quantity (litres)</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="requester_name">Requester Name</label>
            <p id="requester_name" className="plain-text">{formData.requester_name}</p>
          </div>
  
          <div className="form-group">
            <label htmlFor="contact_info">Contact Info</label>
            <p id="contact_info" className="plain-text">{formData.contact_info}</p>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <p id="email" className="plain-text">{formData.email}</p>
          </div>

  
          <div className="form-group">
            <label htmlFor="urgency">Urgency</label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              required
            >
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
  
          <div className="form-group">
            <label htmlFor="hospital_name">Hospital Name</label>
            <input
              type="text"
              id="hospital_name"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className="button-group">
            <button type="submit" className="btn primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default RequestBlood;
