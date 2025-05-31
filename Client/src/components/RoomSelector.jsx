// src/components/RoomSelector.jsx
import React from 'react';

const RoomSelector = ({ selectedRoomId, onRoomChange, rooms, disabled }) => {
  const handleChange = (e) => {
    onRoomChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="roomSelect" className="block text-lg font-medium text-gray-700 mb-2">
        Select Room:
      </label>
      <select
        id="roomSelect"
        value={selectedRoomId}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        disabled={disabled}
      >
        <option value="">-- Choose a Room --</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>
            {room.name.toUpperCase()} (Max Capacity: {room.max_capacity})
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoomSelector;