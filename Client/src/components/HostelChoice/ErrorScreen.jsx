import React from 'react';

const ErrorScreen = ({ error }) => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Error!</h2>
      <p className="text-lg text-red-600 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
      >
        Retry
      </button>
    </div>
  </div>
);

export default ErrorScreen;
