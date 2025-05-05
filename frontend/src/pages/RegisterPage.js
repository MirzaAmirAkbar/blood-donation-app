import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send register request to backend
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age, blood_type: bloodType, location, contact_info: contactInfo, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          alert('Registration successful!');
          navigate('/'); // Redirect to HomePage after successful registration
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="register-page">
      <h1>Register for Blood Donation System</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          required
        />

        <label>Blood Type</label>
        <select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          required
        >
          <option value="">Select your blood type</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label>Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          required
        />

        <label>Contact Info</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder="Enter your contact info"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
