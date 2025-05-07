const express = require('express');
const Appointment = require('../models/Appointment'); // Adjust path as needed

const router = express.Router();

// POST /api/appointments
router.post('/add', async (req, res) => {
    try {
      const { donorId, bloodRequestId, appointment_time } = req.body;
  
      const newAppointment = new Appointment({
        donor: donorId,
        bloodRequest: bloodRequestId,
        appointment_time,
      });
  
      await newAppointment.save();
      res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
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

  // GET /api/appointments/donor/:donorId
router.get('/user/:donorId', async (req, res) => {
  try {
    const { donorId } = req.params;
    
    // Find all appointments for the given donorId
    const appointments = await Appointment.find({ donor: donorId });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ error: 'No appointments found for this donor' });
    }

    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments', details: error.message });
  }
});
  
  
  module.exports = router;
