import React from 'react';

const HostelSelector = ({ selectedHostelName, onHostelChange, hostelOptions, disabled }) => {
  const handleChange = (e) => {
    onHostelChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="hostelSelect" className="block text-lg font-medium text-gray-700 mb-2">
        Select Hostel:
      </label>
      <select
        id="hostelSelect"
        value={selectedHostelName}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={disabled}
      >
        <option value="">-- Choose a Hostel --</option>
        {hostelOptions.map(hostel => (
          <option key={hostel.name} value={hostel.name}>
            {hostel.name} ({hostel.gender})
          </option>
        ))}
      </select>
    </div>
  );
};

export default HostelSelector;