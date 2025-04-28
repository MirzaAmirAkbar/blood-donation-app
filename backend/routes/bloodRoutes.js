const express = require('express');
const BloodRequest = require('../models/BloodRequest'); // Adjust path as needed

const router = express.Router();

// API endpoint to get all blood requests sorted by request_date
router.get('/blood-requests', async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ request_date: -1 }); // Sort by date descending
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blood requests' });
  }
});

// API endpoint to update the status of a blood request to 'confirmed' and add appointment time
router.put('/api/blood-request/confirm/:id', async (req, res) => {
  const { appointment_time } = req.body;
  const { id } = req.params;

  try {
    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    // Update the status and add the appointment time
    request.status = 'confirmed';
    request.appointment_time = appointment_time; // Add this field to store the appointment time
    await request.save();

    res.status(200).json({ message: 'Blood request confirmed and appointment set', request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming blood request' });
  }
});

module.exports = router;
