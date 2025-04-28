// backend/routes/authRoutes.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password matches (no hashing in this case, plain text comparison)
    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(400).json({ message: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
    const { name, age, blood_type, location, contact_info, email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
  
      // Create a new user
      const newUser = new User({
        name,
        age,
        blood_type,
        location,
        contact_info,
        email,
        password,  // In production, you would hash the password here
        is_available: false,  // Default value for availability
      });
  
      // Save the user
      await newUser.save();
  
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  router.put('/update-profile', async (req, res) => {
    const { email, contact_info, location, password } = req.body;
  
    if (!email || !contact_info || !location || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's details
      user.contact_info = contact_info;
      user.location = location;
      user.password = password
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

const BloodRequest = require('../models/BloodRequest'); // Adjust path as needed


// API endpoint to create a new blood request
router.post('/blood-request', async (req, res) => {
  const { blood_type, quantity, requester_name, contact_info, urgency, hospital_name } = req.body;

  // Validation (ensure all required fields are provided)
  if (!blood_type || !quantity || !requester_name || !contact_info || !hospital_name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Create a new blood request instance
  const newRequest = new BloodRequest({
    blood_type,
    quantity,
    requester_name,
    contact_info,
    urgency,
    hospital_name,
  });

  try {
    // Save the request to the database
    await newRequest.save();
    res.status(201).json({ message: 'Blood request created successfully', newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blood request' });
  }
});


  
module.exports = router;
