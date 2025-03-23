const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Import user routes

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // Allows JSON requests

app.use("/api/users", userRoutes); // Add user routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
