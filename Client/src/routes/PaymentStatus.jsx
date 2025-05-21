import React, { useState } from 'react';
import { updatePaymentStatus } from '../api/studentApi';

const PaymentStatus = () => {
  const [regNumber, setRegNumber] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    if (!regNumber || !status) {
      setMessage('❌ Please fill in both fields.');
      return;
    }

    setMessage('Updating...');
    try {
      await updatePaymentStatus(regNumber, { status });
      setMessage('✅ Payment status updated successfully.');
      console.log('Payment status updated:', { regNumber, status });
    } catch (error) {
      console.error(error);
      setMessage(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Update Payment Status</h2>

      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Registration Number</label>
        <input
          type="text"
          placeholder="e.g. CSC/1234/2023"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Payment Status</label>
        <select
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
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Update Payment
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
