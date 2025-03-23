const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  blood_type: { type: String, required: true },
  location: { type: String, required: true },
  contact_info: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_available: { type: Boolean, default: false } // New field added with default value false
});

const User = mongoose.model("User", userSchema);
module.exports = User;
