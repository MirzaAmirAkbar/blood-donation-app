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
    //request.appointment_time = appointment_time; // Add this field to store the appointment time
    await request.save();

    res.status(200).json({ message: 'Blood request confirmed and appointment set', request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error confirming blood request' });
  }
});

// GET /blood-requests?email=someone@example.com
router.get('/blood-requests-email', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const requests = await BloodRequest.find({ email });
    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blood requests' });
  }
});

// PUT /blood-request/:id
router.put('/blood-request-update/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity, hospital_name, urgency } = req.body;

  if (!quantity || !hospital_name || !urgency) {
    return res.status(400).json({ message: 'All fields (quantity, hospital_name, urgency) are required' });
  }

  try {
    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      id,
      { quantity, hospital_name, urgency },
      { new: true } // return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    res.status(200).json({ message: 'Blood request updated', updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating blood request' });
  }
});

// DELETE /blood-request/:id
router.delete('/blood-request-delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRequest = await BloodRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    res.status(200).json({ message: 'Blood request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting blood request' });
  }
});

// GET /api/bloodrequests/:id
router.get('/bloodrequest/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blood request by id
    const bloodRequest = await BloodRequest.findById(id);

    if (!bloodRequest) {
      return res.status(404).json({ error: 'Blood request not found' });
    }

    res.json({ bloodRequest });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blood request', details: error.message });
  }
});




module.exports = router;
