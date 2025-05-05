const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const bloodRoutes = require('./routes/bloodRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Allow CORS for specific domains (adjust for your needs)
app.use(cors({
  origin: [
    'http://localhost:3000', // For local development
    //'https://your-deployed-frontend.vercel.app' // Replace with your frontend's Vercel URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // You can specify the HTTP methods you want to allow
  //credentials: true // If you are sending cookies or authentication headers
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, MERN!');
});

app.use('/api/auth', authRoutes);
app.use('/api/blood-request', bloodRoutes);
app.use('/api/appointment', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
