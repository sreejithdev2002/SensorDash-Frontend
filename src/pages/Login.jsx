// // src/pages/Login.jsx
// import { useState } from "react";
// import axiosInstance from "../axios/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/api/auth/login", {
//         email,
//       });
//       localStorage.setItem("token", response.data.token); // Store token
//       alert("Login Success");
//       navigate("/"); // Redirect to dashboard after successful login
//     } catch (err) {
//       setError("Invalid email or password.");
//       alert("Login Error");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-xl shadow-md w-96">
//         <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-600">Email</label>
//             <input
//               type="email"
//               className="w-full py-2 px-4 border rounded-md mt-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value.toLowerCase())}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-indigo-600 text-white rounded-md mt-4"
//           >
//             Login
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <span className="text-gray-600">Don't have an account? </span>
//           <button
//             className="text-indigo-600"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }









// src/pages/Login.jsx
// import { useState } from "react";
// import axiosInstance from "../axios/axiosInstance";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("/api/auth/login", { email });
//       localStorage.setItem("token", response.data.token);
//       alert("Login Successful");
//       navigate("/");
//     } catch (err) {
//       setError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h1 className="text-3xl font-bold text-[#111d4a] text-center mb-2">SensorDash</h1>
//         <h2 className="text-xl text-gray-700 font-medium mb-6 text-center">Login to your account</h2>
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-600">Email</label>
//             <input
//               type="email"
//               className="w-full py-2 px-4 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value.toLowerCase())}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <span className="text-gray-600">Don't have an account? </span>
//           <button
//             className="text-[#1e1e24] hover:underline cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/Login.svg"; // Save your image in src/assets

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/auth/login", { email });
      localStorage.setItem("SensorDatatoken", response.data.token);
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Illustration */}
        <div className="hidden md:flex items-center justify-center bg-indigo-50 p-6">
          <img src={loginImage} alt="Login Illustration" className="max-w-full h-auto" />
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <h1 className="text-3xl font-bold text-[#92140c] mb-2">SensorDash</h1>
          <h2 className="text-base font-medium text-gray-700 mb-6">Login to your account</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              className="w-full py-2 px-4 border rounded-lg mb-4 focus:ring-2 focus:ring-[#92140c] focus:border-none focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#111d4a] text-white py-2 rounded-lg font-semibold hover:bg-[#0d183f] cursor-pointer"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <button className="text-[#92140c] hover:underline" onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
