import React from "react";

const Dashboard = () => {
  return (
 <div className="relative p-6 sm:p-10">
      {/* Notice box - top right */}
      <div className="absolute right-6 top-6 z-10">
        <div className="bg-red-600 text-white px-4 py-3 rounded font-semibold w-72 shadow-md">
          <div className="text-base mb-1">Notice</div>
          <p className="text-sm font-normal">
            Please go to the Payments tab to validate your payment before continuing
          </p>
        </div>
      </div>

      {/* Main content */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Payment Status */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Payment Status</h2>
        <div className="bg-blue-100 text-center py-6 rounded text-gray-600 font-medium">
          Not Submitted
        </div>
      </div>

      {/* Allocated Room */}
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Allocated Room</h2>
        <div className="grid grid-cols-3 bg-blue-100 py-3 px-4 rounded font-bold text-center mb-4">
          <div>Hostel</div>
          <div>Block</div>
          <div>Room</div>
        </div>
        <div className="border-2 border-blue-500 rounded p-6 min-h-[120px]" />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © 2025 Ahmadu Bello University Zaria. All rights reserved.
      </footer>
    </div>

  );
};

export default Dashboard;
