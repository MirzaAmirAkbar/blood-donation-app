# Blood Donation & Appointment Management System

A full-stack MERN application designed to manage blood donation requests, user authentication, and appointment scheduling. This platform connects individuals in need of blood with potential donors and streamlines the booking process for related health appointments.

## 🚀 Tech Stack

**Frontend:**
- React (v19)

**Backend:**
- Node.js
- Express.js
- MongoDB Atlas

## ✨ Features

- **User Authentication:** Secure registration and login workflows (`/api/auth`).
- **Blood Requests:** Users can create, view, and manage blood donation requests (`/api/blood-request`).
- **Appointment Scheduling:** Seamless booking and management for medical or donation appointments (`/api/appointment`).
- **RESTful API:** A robust Node.js backend to handle data operations and routing.
- **Responsive Frontend:** Built with React to provide a dynamic single-page application experience.

## 🛠️ Installation & Setup

### Prerequisites
Make sure you have the following installed on your local machine:
- Node.js (v16 or higher recommended)
- MongoDB (Local instance or MongoDB Atlas URI)

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and configure your environment variables.

```bash
cd backend
npm install
```

Create a .env file in the backend directory and add the following variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the development server:

```bash
# Runs the server with nodemon for auto-reloading
npm run dev
```

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies.

```bash
cd frontend
npm install
```

Start the React development server:

```bash
npm start
```

The frontend will run on http://localhost:3000 and communicate with the backend running on http://localhost:5000.

