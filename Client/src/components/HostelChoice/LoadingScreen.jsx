import React from 'react';

const LoadingScreen = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center p-8 bg-white rounded-lg shadow-xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4 mx-auto"></div>
      <p className="text-xl text-gray-700 font-medium">{message || 'Loading...'}</p>
    </div>
  </div>
);

export default LoadingScreen;
