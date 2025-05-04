// components/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("SensorDatatoken");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
