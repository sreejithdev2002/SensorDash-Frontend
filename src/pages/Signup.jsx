import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import signupImage from "../assets/Signup.svg"; // Replace with your actual image path
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/api/auth/signup", { name, email });
      localStorage.setItem("SensorDataEmail", email);
      toast.success("Signup Successful. OTP sent to your Email.");
      navigate("/verify-otp");
    } catch (err) {
      toast.error("Signup failed. Try again");
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-indigo-50 p-6">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-bold text-[#77536f] mb-2">SensorDash</h1>
          <h2 className="text-base font-medium text-gray-700 mb-6">
            Create your account
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignup}>
            <label className="block mb-2 text-gray-900">Username</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 px-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#77536f] focus:border-none focus:outline-none"
              required
            />
            <label className="block mb-2 text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full py-2 px-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#77536f] focus:border-none focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#111d4a] text-white py-2 rounded-lg font-semibold hover:bg-[#0d183f] cursor-pointer"
            >
              Sign up
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <button
              className="text-[#77536f] hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
