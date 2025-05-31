// src/components/AccommodationPayment.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkBooking } from '../api/hostelApi';
// Add your payment API imports here
// import { processPayment, getPaymentDetails } from '../api/paymentApi';

const AccommodationPayment = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');

  // Get student details from localStorage
  const studentId = localStorage.getItem('studentId');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!studentId || !token) {
        setError('Authentication required. Please log in first.');
        setLoading(false);
        return;
      }
      try {
        const response = await checkBooking(studentId, token);
        if (response.isBooked) {
          setBookingDetails(response);
          setMessage('Ready to process payment for your accommodation.');
        } else {
          setError('No accommodation booking found. Please book accommodation first.');
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [studentId, token]);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      setMessage('❌ Please select a payment method.');
      return;
    }

    setPaymentLoading(true);
    setMessage('Processing payment...');

    try {
      // Replace with your actual payment API call
      // const paymentResponse = await processPayment({
      //   studentId,
      //   bookingId: bookingDetails.bookingId,
      //   paymentMethod,
      //   amount: bookingDetails.amount,
      //   token
      // });

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('✅ Payment processed successfully!');
      // Redirect to success page or dashboard after payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      console.error('Payment error:', err);
      setMessage('❌ Payment failed. Please try again.');
      setError(err.response?.data?.error || 'Payment processing failed.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleBackToBooking = () => {
    navigate('/book-room');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={handleBackToBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go to Booking
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl my-10 font-sans">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Accommodation Payment
      </h2>

      {bookingDetails && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h3>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-medium">Booking ID:</span> {bookingDetails.assignedRoomId || 'N/A'}</p>
            <p><span className="font-medium">Room:</span> {bookingDetails.roomName || 'Room details'}</p>
            <p><span className="font-medium">Hostel:</span> {bookingDetails.hostelName || 'Hostel details'}</p>
            <p><span className="font-medium">Amount:</span> <span className="text-2xl font-bold text-green-600">₦25,000</span></p>
          </div>
        </div>
      )}

      <form onSubmit={handlePayment} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-4">
            Select Payment Method:
          </label>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                id="card"
                name="paymentMethod"
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={paymentLoading}
              />
              <label htmlFor="card" className="ml-3 text-gray-700">
                Credit/Debit Card
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="bank"
                name="paymentMethod"
                type="radio"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={paymentLoading}
              />
              <label htmlFor="bank" className="ml-3 text-gray-700">
                Bank Transfer
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="paystack"
                name="paymentMethod"
                type="radio"
                value="paystack"
                checked={paymentMethod === 'paystack'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                disabled={paymentLoading}
              />
              <label htmlFor="paystack" className="ml-3 text-gray-700">
                Paystack
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleBackToBooking}
            className="flex-1 py-3 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            disabled={paymentLoading}
          >
            Back to Booking
          </button>
          
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out"
            disabled={!paymentMethod || paymentLoading}
          >
            {paymentLoading ? 'Processing Payment...' : 'Pay Now - ₦25,000'}
          </button>
        </div>
      </form>

      {message && (
        <div className={`mt-6 text-center text-lg font-semibold ${
          message.startsWith('❌') ? 'text-red-500' : 
          message.startsWith('✅') ? 'text-green-500' : 
          'text-blue-500'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AccommodationPayment;
