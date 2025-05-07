const express = require('express');
const Appointment = require('../models/Appointment'); // Adjust path as needed
const BloodRequest = require('../models/BloodRequest'); // Adjust path as needed
const Notification = require('../models/Notification');

const router = express.Router();

// POST /api/appointments
router.post('/add', async (req, res) => {
  try {
    const { donorId, bloodRequestId, appointment_time } = req.body;

    // Validate blood request
    const bloodRequest = await BloodRequest.findById(bloodRequestId);
    if (!bloodRequest) {
      return res.status(404).json({ error: 'Blood request not found' });
    }

    // Create appointment
    const newAppointment = new Appointment({
      donor: donorId,
      bloodRequest: bloodRequestId,
      appointment_time,
    });

    await newAppointment.save();

    // Create notification
    const notificationText = `A donation appointment is scheduled for ${new Date(appointment_time).toLocaleString()} for your request ID: ${bloodRequestId}`;

    const newNotification = new Notification({
      email: bloodRequest.email,
      notification_time: new Date(),
      text: notificationText,
      appointment: newAppointment._id,
      bloodRequest: bloodRequestId,
    });

    await newNotification.save();

    res.status(201).json({
      message: 'Appointment and notification created successfully',
      appointment: newAppointment,
      notification: newNotification
    });
  } catch (error) {
    console.error('Error creating appointment or notification:', error);
    res.status(500).json({ error: 'Failed to create appointment', details: error.message });
  }
});

  // DELETE /api/appointments/:id
router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const deleted = await Appointment.findByIdAndDelete(id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete appointment', details: error.message });
    }
  });

  // PUT /api/appointments/:id
router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { appointment_time } = req.body;
  
      const updated = await Appointment.findByIdAndUpdate(
        id,
        { appointment_time },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
  
      res.json({ message: 'Appointment time updated', appointment: updated });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update appointment', details: error.message });
    }
  });


// GET appointments by donor email and populate bloodRequest
router.get('/user/:donorEmail', async (req, res) => {
  try {
    const donorEmail = req.params.donorEmail;

    // Find all appointments for the donor and populate the bloodRequest data
    const appointments = await Appointment.find({ donor: donorEmail })
      .populate('bloodRequest');  // Populate the 'bloodRequest' reference

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this donor.' });
    }

    // Return the populated appointments as JSON
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching appointments.' });
  }
});


  
  
  module.exports = router;
