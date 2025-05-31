import React from 'react';

const MessageDisplay = ({ message, type = 'default', fullScreen = false }) => {
  if (!message) return null;

  const getMessageClass = () => {
    const baseClass = fullScreen 
      ? "flex justify-center items-center h-screen bg-gray-100" 
      : "mt-6 text-center text-lg font-semibold";
    
    if (type === 'error') {
      return `${baseClass} ${fullScreen ? 'text-red-600 text-xl' : 'text-red-500'}`;
    }
    
    if (message.startsWith('❌')) {
      return `${baseClass} text-red-500`;
    }
    
    if (message.startsWith('✅')) {
      return `${baseClass} text-green-500`;
    }
    
    return `${baseClass} ${fullScreen ? 'text-gray-700 text-xl' : 'text-green-500'}`;
  };

  return (
    <div className={fullScreen ? "flex justify-center items-center h-screen bg-gray-100" : ""}>
      <p className={getMessageClass()}>
        {message}
      </p>
    </div>
  );
};

export default MessageDisplay;