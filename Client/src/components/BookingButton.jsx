import React from 'react';

const BookingButton = ({ loading, isStudentBooked, disabled }) => {
  const getButtonText = () => {
    if (loading) return 'Processing...';
    if (isStudentBooked) return 'Already Booked';
    return 'Book Now';
  };

  return (
    <button
      type="submit"
      className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
      disabled={disabled}
    >
      {getButtonText()}
    </button>
  );
};

export default BookingButton;