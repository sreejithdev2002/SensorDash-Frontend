// import { useState } from "react";
// import axiosInstance from "../axios/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import OtpImage from "../assets/Otp.svg"; // Replace with your actual image path

// export default function VerifyOtp() {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/api/auth/verify-otp", { otp });
//       alert("OTP Verified Successfully!");
//       navigate("/login");
//     } catch (err) {
//       setError("Invalid or expired OTP.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
//         {/* Illustration */}
//         <div className="hidden md:flex items-center justify-center bg-indigo-50 p-6">
//           <img src={OtpImage} alt="Verify OTP Illustration" className="max-w-full h-auto" />
//         </div>

//         {/* Form Section */}
//         <div className="p-8 md:p-10">
//           <h1 className="text-3xl font-bold text-[#6562f9] text-center mb-2">SensorDash</h1>
//           <h2 className="text-xl font-medium text-gray-700 text-center mb-6">Verify Your OTP</h2>
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           <form onSubmit={handleVerify}>
//             <label className="block mb-2 text-gray-600">Enter OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full py-2 px-4 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
//             >
//               Verify OTP
//             </button>
//           </form>
//           <p className="text-center mt-4 text-gray-600">
//             Already verified?{" "}
//             <button className="text-indigo-600 hover:underline" onClick={() => navigate("/login")}>
//               Login
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import OtpImage from "../assets/Otp.svg"; // Ensure this path is correct

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, ""); // Only digits
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input
    if (index < 5 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    const email = localStorage.getItem("SensorDataEmail");

    try {
      const response = await axiosInstance.post("/api/auth/verify-otp", {
        email,
        otp: finalOtp,
      });

      localStorage.setItem("SensorDatatoken", response.data.token)

      alert("OTP Verified Successfully!");
      navigate("/");
    } catch (err) {
      setError("Invalid or expired OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-indigo-50 p-6">
          <img
            src={OtpImage}
            alt="Verify OTP Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-bold text-[#6562f9] mb-2">SensorDash</h1>
          <h2 className="text-xl font-medium text-gray-700 mb-6">
            Enter Your 6-digit OTP
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 my-10">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  className="w-12 h-12 text-center text-lg border rounded-md focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#6562f9] text-white py-2 rounded-lg font-semibold hover:bg-[#504de8] cursor-pointer"
            >
              Verify OTP
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already verified?{" "}
            <button
              className="text-indigo-600 hover:underline cursor-pointer"
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
