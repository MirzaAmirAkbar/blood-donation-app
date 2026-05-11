Blood Donation & Appointment Management System
A full-stack MERN application designed to manage blood donation requests, user authentication, and appointment scheduling. This platform connects individuals in need of blood with potential donors and streamlines the booking process for related health appointments.

🚀 Tech Stack
Frontend:

React (v19)

React Router DOM (Routing)

Testing Library & Jest (Unit Testing)

Backend:

Node.js

Express.js

MongoDB & Mongoose (Database & ODM)

CORS & dotenv (Environment Management)

✨ Features
User Authentication: Secure registration and login workflows (/api/auth).

Blood Requests: Users can create, view, and manage blood donation requests (/api/blood-request).

Appointment Scheduling: Seamless booking and management for medical or donation appointments (/api/appointment).

RESTful API: A robust Node.js backend to handle data operations and routing.

Responsive Frontend: Built with React to provide a dynamic single-page application experience.

🛠️ Installation & Setup
Prerequisites
Make sure you have the following installed on your local machine:

Node.js (v16 or higher recommended)

MongoDB (Local instance or MongoDB Atlas URI)

1. Clone the repository
Bash
git clone <repository-url>
cd <project-directory>
2. Backend Setup
Navigate to the backend directory, install dependencies, and configure your environment variables.

Bash
cd backend
npm install
Create a .env file in the backend directory and add the following variables:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
Start the development server:

Bash
# Runs the server with nodemon for auto-reloading
npm run dev 
3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.

Bash
cd frontend
npm install
Start the React development server:

Bash
npm start
The frontend will run on http://localhost:3000 and communicate with the backend running on http://localhost:5000.

📡 API Endpoints
The backend exposes the following primary REST routes:

Authentication: * POST /api/auth/... - User registration, login, and token management.

Blood Requests: * GET /api/blood-request - Fetch blood requests.

POST /api/blood-request - Create a new blood request.

Appointments: * GET /api/appointment - View scheduled appointments.

POST /api/appointment - Book a new appointment.

🧪 Testing
The frontend includes setup for component and DOM testing using Jest and React Testing Library.

To run the frontend test suite:

Bash
cd frontend
npm test
📜 License
This project is licensed under the ISC License.