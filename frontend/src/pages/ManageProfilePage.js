// frontend/pages/ManageProfilePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ManageProfilePage.css';

const ManageProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setContactInfo(storedUser.contact_info || '');
      setLocation(storedUser.location || '');
      setPassword('');
    }
  }, []);

  const handleUpdate = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser?.email) {
      alert('User is not logged in or email is missing');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: storedUser.email,
          contact_info: contactInfo,
          location: location,
          password: password,
        }),
      });

      if (response.ok) {
        const updatedUser = { ...storedUser, contact_info: contactInfo, location: location };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile updated successfully!');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An unexpected error occurred');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="manage-profile-container">
      
      <div className="profile-card">
        <h1>Manage Your Profile</h1>
        <div className="profile-static">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Blood Type:</strong> {user.blood_type}</p>
        </div>

        <div className="profile-editable">
          <label>Contact Info</label>
          <input
            type="text"
            placeholder="Enter contact info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button onClick={handleUpdate} className="btn primary">Update</button>
          <button onClick={handleBack} className="btn secondary">Back</button>
        </div>
      </div>
    </div>
  );
};

export default ManageProfilePage;
