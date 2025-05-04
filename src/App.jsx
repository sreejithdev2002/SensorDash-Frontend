import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

function App() {

  return (

    <Router>
      <Routes>
      <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
}

export default App;
