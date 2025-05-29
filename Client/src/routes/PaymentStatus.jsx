// src/components/PaymentStatus.jsx

import React, { useState, useEffect } from 'react'; // Import useEffect now
import { updatePaymentStatus } from '../api/studentApi'; // Ensure this import is correct

const PaymentStatus = () => {
  // State for the payment status selected from the dropdown
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState(null); // State to store studentId from localStorage
  const [isAuthReady, setIsAuthReady] = useState(false); // To ensure localStorage is loaded

  // Use useEffect to get studentId from localStorage when the component mounts
  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
    setIsAuthReady(true); // Indicate that we've checked localStorage
  }, []); // Empty dependency array means this runs once on mount


  const handleUpdate = async () => {
    // Check if studentId was successfully retrieved from localStorage
    if (!studentId) {
      setMessage('❌ Student ID not found in local storage. Please log in.');
      return;
    }

    if (!status) {
      setMessage('❌ Please select a payment status.');
      return;
    }

    // Convert the string status from the dropdown to a boolean for the API call
    let paidStatusBoolean;
    if (status === 'paid') {
      paidStatusBoolean = true;
    } else if (status === 'pending') {
      paidStatusBoolean = false;
    } else {
      setMessage('❌ Invalid status selected.');
      return;
    }

    setIsLoading(true);
    setMessage('Updating...');

    try {
      // Call the API with the Student ID (UUID) from localStorage
      await updatePaymentStatus(studentId, paidStatusBoolean); // Use the studentId from state
      setMessage('✅ Payment status updated successfully.');
      console.log('Payment status updated:', { studentId, paidStatusBoolean });
    } catch (error) {
      console.error("Error updating payment status:", error);
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render logic based on whether auth data is ready
  if (!isAuthReady) {
    return <div className="max-w-md mx-auto p-6 text-center text-gray-600">Loading user data...</div>;
  }

  // If studentId is not available, show a message indicating that login is needed
  if (!studentId) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg font-sans text-center">
        <p className="text-red-500 font-semibold mb-4">You need to be logged in to update payment status.</p>
        <p className="text-gray-600">Please log in to proceed.</p>
        {/* Optionally, add a link to login page */}
        {/* <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md">Go to Login</button> */}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Your Payment Status</h2>
      {/* Student ID is no longer an input, but can be displayed for confirmation */}
      <div className="mb-6">
        <label htmlFor="paymentStatus" className="block text-lg font-medium text-gray-700 mb-2">Payment Status</label>
        <select
          id="paymentStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update Payment Status'}
      </button>

      {message && (
        <p
          className={`mt-6 text-center text-lg font-semibold ${
            message.startsWith('❌') ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PaymentStatus;