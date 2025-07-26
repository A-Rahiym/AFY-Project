import React from 'react';

const SUCCESS_PREFIX = '✅';

const StatusMessage = ({ message }) => (
  <section className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Status</h2>
    <div
      className={`mt-4 p-3 rounded-md ${
        message.startsWith(SUCCESS_PREFIX)
          ? 'bg-green-100 text-green-800'
          : 'bg-blue-100 text-blue-800'
      } text-center text-sm font-medium`}
    >
      {message}
    </div>
  </section>
);

export default StatusMessage;
