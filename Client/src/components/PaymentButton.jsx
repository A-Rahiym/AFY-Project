import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({ isStudentBooked, disabled }) => {
  const navigate = useNavigate();

  const handlePaymentRedirect = () => {
    navigate('/accommodation-payment');
  };

  if (!isStudentBooked) {
    return null; // Don't show payment button if not booked
  }

  return (
    <button
      type="button"
      onClick={handlePaymentRedirect}
      className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out mt-4"
      disabled={disabled}
    >
      Proceed to Payment
    </button>
  );
};

export default PaymentButton;