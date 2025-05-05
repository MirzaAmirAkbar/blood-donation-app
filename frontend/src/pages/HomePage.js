// frontend/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Blood Donation Management System</h1>
      <div className="options">
        <Link to="/login" className="button">Login</Link>
        <Link to="/register" className="button">Register</Link>
      </div>
    </div>
  );
};

export default HomePage;
