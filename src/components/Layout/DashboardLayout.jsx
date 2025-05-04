// components/Layout/DashboardLayout.js
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
