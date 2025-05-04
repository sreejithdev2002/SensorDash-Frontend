# 🌐 SensorDash – Frontend

SensorDash is a real-time IoT dashboard frontend built using **React**, **Tailwind CSS**, and **Chart.js**. It supports OTP-based signup/login, real-time data visualization, and flowchart management.

---

## 🚀 Features

- 📩 OTP-based authentication (Signup/Login)
- 📊 Real-time sensor data updates via charts
- 🧠 Interactive flowchart builder
- 📱 Responsive and mobile-friendly UI
- 🔐 JWT-based session management

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/sreejithdev2002/SensorDash-Frontend.git
```
### 2. Install dependencies

```bash
npm install
```
### 3. Configure environment variables

```
VITE_API_BASE_URL=http://localhost:5000
```
### 4.Run the development server

```bash
npm run dev
```
The app will run at: [http://localhost:5173](http://localhost:5173)

---

## 📬 API Endpoints

### 🔐 Auth

POST ---- `/api/auth/signup` ---- Sends OTP  
POST ---- `/api/auth/verify-otp` ---- Verifies OTP  
POST ---- `/api/auth/login` ---- Authenticates user

### 📊 Sensor Data

POST ---- `/api/data/start` ---- Start data generation/simulation  
POST ---- `/api/data/stop` ---- Stop data generation/simulation  
GET ---- `/api/data/history` ---- Fetch historical sensor data

### 🔁 Flow

POST ---- `/api/flow/save` ---- Saves the flowchart  
GET ---- `/api/flow/load` ---- Loads the saved flowchart

---

## AI Usage

### We use AI tools to:

- Scaffold the frontend structure and React components

- Enhance the usability of the login and signup forms

- Optimize data fetching and state management logic

- Generate API documentation for the frontend

---

## ⚙️ Build for Production

### To build the project for production, use the following command:
```
npm run build
```
This will create a dist folder with the production-ready files.