// src/components/HostelAndRoomBooking.jsx
import React, { useEffect, useState } from 'react';
import { getHostels as getHostelsApi } from '../api/hostelApi';

const HostelAndRoomBooking = () => {
  const [hostelDetails, setHostelDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const response = await getHostelsApi('Amina Hall');
        setHostelDetails(response.hostel); // Assuming response is { hostel: { ... } }
      } catch (err) {
        console.error('Error fetching hostel:', err);
        setError(err.response?.data?.error || 'Failed to fetch hostel.');
      }
    };

    fetchHostel();
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!hostelDetails) return <p>Loading hostel details...</p>;

  return (
    <div>
      <h1>{hostelDetails.name}</h1>
      <p>Gender: {hostelDetails.gender}</p>

      {hostelDetails.hostel_block.map(block => (
        <div key={block.id}>
          <h2>Block: {block.name}</h2>
          <ul>
            {block.hostel_block_room.map(room => (
              <li key={room.id}>
                Room: {room.name}, Max Capacity: {room.max_capacity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HostelAndRoomBooking;
