// src/pages/StudentLogin.jsx
import React, { useState } from "react";
// Assuming studentLogin from authApi is the correct function for student login
import { loginStudent } from "../api/studentApi";
import { Link, useNavigate } from "react-router-dom";

/**
 * Student Login Component.
 * Allows students to log in using their registration number and password.
 * Styled to match the provided 'Log in - student.png' image.
 */
const StudentLogin = () => {
  const [form, setForm] = useState({ reg_number: "", password: "" }); // Using reg_number as per your original code
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  /**
   * Handles changes to form input fields.
   * Updates the form state.
   * @param {Event} e - The change event from the input element.
   */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  /**
   * Handles the login form submission.
   * Calls the loginStudent API, handles success/error, and navigates.
   * @param {Event} e - The form submission event.
   */

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    try {
      // IMPORTANT: Your backend's loginStudent controller currently expects 'email' and 'password'.
      // If you are using 'reg_number' for login, your backend controller (loginStudent in authController.js)
      // needs to be updated to find the student by 'reg_number' instead of 'email'.
      // For now, I'm passing form.email and form.password to match the API signature,
      // but you need to align your backend if 'reg_number' is the login identifier.
      const res = await loginStudent(form); // Assuming studentLogin can take reg_number as first arg
      console.log("Login Response:",res)
      if (res?.token) {
        localStorage.setItem("studentToken", res.token);
        localStorage.setItem("studentUser", JSON.stringify(res.student));
        // Assuming res.user contains these properties directly from the backend login response
        localStorage.setItem("studentId", res.student.id || "");
        localStorage.setItem("studentGender", res.student.gender || "");
        localStorage.setItem("userCampus", res.student.campus || "");
        console.log("Login successful:", res);
        setMessage("✅ Login successful!");
        navigate("/payment-status"); // Redirect to the student's dashboard or next page
      } else {
        setMessage("❌ Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Display a more specific error message from the backend response if available
      setMessage(`❌ Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    // Main container for the entire page, matching the dark blue background
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      {/* Login form container */}
      <div className="w-full max-w-md text-center">
        {/* Title "Log in" */}
        <h2 className="text-white text-4xl font-bold mb-10">Log in</h2>{" "}
        {/* Increased font size and weight */}
        <form onSubmit={handleLogin} className="space-y-6">
          {" "}
          {/* Added space-y for vertical spacing */}
          {/* Registration Number Input */}
          <div>
            <label
              htmlFor="reg_number"
              className="block text-white text-lg font-medium mb-2 text-left"
            >
              {" "}
              {/* Changed text color and alignment */}
              Registration Number
            </label>
            <input
              type="text"
              id="reg_number" // Added ID for label association
              name="reg_number"
              value={form.reg_number}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" /* Changed border-none, bg-white */
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-white text-lg font-medium mb-2 text-left"
            >
              {" "}
              {/* Changed text color and alignment */}
              Password
            </label>
            <input
              type="password"
              id="password" // Added ID for label association
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border-none rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" /* Changed border-none, bg-white */
            />
          </div>
          {/* "Don't have an account?" link */}
          <div className="text-right text-sm mt-2 text-white">
            {" "}
            {/* Moved to be above the button */}
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:underline font-medium" /* Adjusted link color */
            >
              Sign up
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" /* Added focus styles */
          >
            Log in
          </button>
        </form>
        {/* Message display area */}
        {message && (
          <p
            className={`mt-6 text-center text-lg font-semibold ${
              message.startsWith("❌") ? "text-red-400" : "text-green-400"
            }`} /* Adjusted text colors for dark background */
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
export default StudentLogin; // Ensure this is the default export
