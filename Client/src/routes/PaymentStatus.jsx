// src/components/PaymentStatus.jsx

import React, { useState, useEffect } from 'react';
import { updatePaymentStatus } from '../api/studentApi';
import { Link } from 'react-router-dom';

const PaymentStatus = () => {
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  

  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
    setIsAuthReady(true);
  }, []);

  const handleUpdate = async () => {
    if (!studentId) {
      setMessage('❌ Student ID not found in local storage. Please log in.');
      return;
    }

    if (!status) {
      setMessage('❌ Please select the evidence status.');
      return;
    }

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
    setMessage('Submitting evidence...');

    try {
      await updatePaymentStatus(studentId, paidStatusBoolean);
      setMessage('✅ Evidence submitted successfully.');
      console.log('Payment status updated:', { studentId, paidStatusBoolean });
    } catch (error) {
      console.error("Error submitting evidence:", error);
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthReady) {
    return <div className="max-w-md mx-auto p-6 text-center text-gray-600">Loading user data...</div>;
  }

  if (!studentId) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg font-sans text-center">
        <p className="text-red-500 font-semibold mb-4">You need to be logged in to submit your evidence.</p>
        <p className="text-gray-600">Please log in to proceed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Submit Evidence of School Fees Payment</h2>

      <div className="mb-6">
        <label htmlFor="paymentStatus" className="block text-lg font-medium text-gray-700 mb-2">
          Evidence Status
        </label>
        <select
          id="paymentStatus"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Status</option>
          <option value="paid">I have paid</option>
          <option value="pending">I have not paid</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Evidence'}
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

      <div className="text-center mt-8">
        <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">
          ⏭️ Skip for now and go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentStatus;
