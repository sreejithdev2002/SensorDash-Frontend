
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaChartBar,
  FaProjectDiagram,
  FaUser,
  FaCogs,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaDatabase,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("SensorDatatoken");
    navigate("/login");
    console.log("Logged out");
  };

  return (
    <div>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col justify-between w-64 h-screen bg-[#1e1e24] text-[#fff8f0] p-6">
        <div>
          <h2 className="text-2xl text-center font-bold mb-8">SensorDash</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaProjectDiagram /> Flowcharts
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaChartBar /> Graphs
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaDatabase /> Sensor Data
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaCogs /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaBell /> Notifications
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaQuestionCircle /> Help
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
              >
                <FaUser /> Profile
              </Link>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 flex justify-center items-center gap-2 p-2 bg-[#92140c] text-white rounded hover:bg-[#81130b] transition-all"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div className="md:hidden">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-black p-2 fixed top-4 left-4 z-30 bg-white rounded-full shadow cursor-pointer"
        >
          <FaBars size={20} />
        </button>

        {/* Sidebar Drawer */}
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 w-64 h-full bg-[#1e1e24] text-white transform transition-transform duration-300 z-40 p-6 flex flex-col justify-between`}
        >
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-white p-2 rounded-full cursor-pointer"
          >
            <FaTimes size={20} />
          </button>

          {/* Sidebar Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-8 text-center">SensorDash</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaProjectDiagram /> Flowcharts
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaChartBar /> Graphs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaDatabase /> Sensor Data
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaCogs /> Settings
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaBell /> Notifications
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaQuestionCircle /> Help
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#3d3d43] transition-all"
                >
                  <FaUser /> Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogout();
              handleLinkClick();
            }}
            className="w-full mt-6 flex items-center justify-center gap-2 p-2 bg-[#92140c] text-white rounded hover:bg-red-700 transition-all"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Background Overlay */}
        {isOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-[rgb(0,0,0,0.2)] z-30"
          ></div>
        )}
      </div>
    </div>
  );
}
