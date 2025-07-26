// src/pages/StudentLogin.jsx
import React, { useState } from "react";
import { loginStudent } from "../api/studentApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const StudentLogin = () => {
  const [form, setForm] = useState({ reg_number: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const handleLogin = async (e) => {
  e.preventDefault();
  setShowModal(true);
  setIsError(false);
  setModalMessage("Logging in...");

  try {
    const res = await loginStudent(form);
    if (res?.token) {
      login(res);  // Call the context login function
      setModalMessage("✅ Login successful!");
      setTimeout(() => {
        setShowModal(false);
        navigate("/payment-status");
      }, 1500);
    } else {
      setIsError(true);
      setModalMessage("❌ Login failed. Please check your credentials.");
    }
  } catch (err) {
    console.error("Login Error:", err);
    setIsError(true);
    setModalMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
  }
};


  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-white text-4xl font-bold mb-10">Log in</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="reg_number" className="block text-white text-lg font-medium mb-2 text-left">
              Registration Number
            </label>
            <input
              type="text"
              id="reg_number"
              name="reg_number"
              value={form.reg_number}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-lg font-medium mb-2 text-left">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
            />
          </div>

          <div className="text-right text-sm mt-2 text-white">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:underline font-medium">
              Sign up
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log in
          </button>
        </form>

        {/* ✅ Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white/90 rounded-xl shadow-lg p-6 max-w-sm w-full text-center flex flex-col items-center">
              {!isError && modalMessage === "Logging in..." && (
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mb-4"></div>
              )}
              <p className={`text-lg font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLogin;
