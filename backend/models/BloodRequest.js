const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  blood_type: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  quantity: { type: Number, required: true },
  requester_name: { type: String, required: true },
  contact_info: { type: String, required: true },
  email: { type: String, required: true }, // <-- New field
  status: { type: String, enum: ['pending', 'confirmed', 'fulfilled', 'rejected'], default: 'pending' },
  request_date: { type: Date, default: Date.now },
  urgency: { type: String, enum: ['high', 'normal', 'low'], default: 'normal' },
  hospital_name: { type: String, required: true },
});


const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

module.exports = BloodRequest;
