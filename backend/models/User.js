// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  blood_type: String,
  location: String,
  contact_info: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_available: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
