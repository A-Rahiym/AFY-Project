// src/components/HostelAndRoomBooking.jsx
import React, { useState, useEffect } from 'react';
import { getHostelDetails, checkBooking , bookAccommodation} from '../api/hostelApi';
// bookAccommodation from studentApi
// Import the external JSON data for initial hostel options
import initialHostelOptions from '../data/hostelOptions.json';
const HostelAndRoomBooking = () => {
  // State to store the selected hostel's name directly from the dropdown (e.g., "Shehu Idris Hall")
  const [selectedHostelName, setSelectedHostelName] = useState('');
  // State to store the detailed information of the currently selected hostel (blocks, rooms)
  const [hostelDetails, setHostelDetails] = useState(null);
  // State for the ID of the selected block within the chosen hostel
  const [selectedBlockId, setSelectedBlockId] = useState('');
  // State for the ID of the selected room within the chosen block
  const [selectedRoomId, setSelectedRoomId] = useState('');
  // State for displaying messages to the user (success, error, loading)
  const [message, setMessage] = useState('Please select a hostel from the dropdown.');
  // State to indicate if data is currently being loaded or processed (for hostel details/booking)
  const [loading, setLoading] = useState(false);
  // State for handling and displaying errors
  const [error, setError] = useState(null);

  // State to track if the student has already booked accommodation
  const [isStudentBooked, setIsStudentBooked] = useState(false);
  // State for initial loading of the student's booking status
  const [checkingBookingStatus, setCheckingBookingStatus] = useState(true);

  // Retrieve student ID and authentication token from localStorage
  // These are assumed to be set upon successful student login.
  const studentId = localStorage.getItem('studentId');
  const token = localStorage.getItem('token');

  // useEffect hook to check student's booking status on component mount.
  // This runs once when the component mounts, and whenever studentId or token changes.
  useEffect(() => {
    const fetchBookingStatus = async () => {
      // If studentId or token is not available (e.g., not logged in),
      // set as not booked and stop checking.
      if (!studentId || !token) {
        setIsStudentBooked(false);
        setCheckingBookingStatus(false);
        setMessage('Please log in to book accommodation.');
        return;
      }

      setCheckingBookingStatus(true); // Indicate that booking status is being checked
      try {
        // Call the checkBooking API function to verify if the student has a booking.
        const response = await checkBooking(studentId, token);
        // Assuming your backend returns { isBooked: true/false, assignedRoomId: '...' }
        if (response.isBooked) {
          setIsStudentBooked(true);
          setMessage(`You have already booked accommodation.`);
          // Optionally, you could display the room they booked, e.g.:
          // setMessage(`You have already booked accommodation in room: ${response.assignedRoomId}.`);
        } else {
          setIsStudentBooked(false);
          setMessage('Please select a hostel from the dropdown to book your accommodation.');
        }
      } catch (err) {
        console.error("Error checking student booking status:", err);
        setError("Failed to load your booking status. Please try again.");
        setIsStudentBooked(false); // Assume not booked if the check fails
      } finally {
        setCheckingBookingStatus(false); // Finished checking booking status
      }
    };

    fetchBookingStatus(); // Execute the function to fetch booking status
  }, [studentId, token]); // Dependencies: re-run if studentId or token changes

  // useEffect hook to fetch detailed information for the selected hostel.
  // This runs whenever `selectedHostelName` changes, AND only if the student is NOT already booked.
  useEffect(() => {
    const fetchSelectedHostelDetails = async () => {
      // If no hostel is selected, clear previous details and reset states
      if (!selectedHostelName) {
        setHostelDetails(null);
        setSelectedBlockId('');
        setSelectedRoomId('');
        // Only set message if student hasn't already booked
        if (!isStudentBooked) {
          setMessage('Please select a hostel from the dropdown.');
        }
        return;
      }

      // If student is already booked, prevent fetching new hostel details.
      // This ensures the UI remains consistent with the "already booked" state.
      if (isStudentBooked) {
        setLoading(false); // Ensure loading is off
        return;
      }

      setLoading(true); // Set loading to true while fetching hostel details
      setError(null);   // Clear any previous errors
      setMessage(`Loading details for ${selectedHostelName}...`);

      try {
        // Call the getHostelDetails API function, passing the selected hostel's name directly.
        // Your backend's getHostelDetailsController and model must be able to handle this format.
        const response = await getHostelDetails(selectedHostelName);
        // Assuming the response structure is { success: true, hostel: {...} }
        setHostelDetails(response.hostel);
        setMessage(`Details for ${selectedHostelName} loaded.`);
      } catch (err) {
        console.error("Error fetching selected hostel details:", err);
        // Set error message based on API response or generic message
        setError(err.response?.data?.error || "Failed to load selected hostel details. Please try again.");
        setHostelDetails(null); // Clear hostel data on error
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    // Only fetch if initial booking status check is complete AND student is not booked.
    if (!checkingBookingStatus && !isStudentBooked) {
      fetchSelectedHostelDetails();
    }
  }, [selectedHostelName, checkingBookingStatus, isStudentBooked]); // Dependencies: re-run if these states change

  // Helper function to filter and return rooms belonging to the currently selected block.
  const getRoomsForCurrentBlock = () => {
    // Return empty array if no hostel details or no block selected
    if (!hostelDetails || !selectedBlockId) {
      return [];
    }
    // Find the selected block within the hostel details
    const block = hostelDetails.hostel_block.find(b => b.id === selectedBlockId);
    // Return the rooms of that block, or an empty array if block not found
    return block ? block.hostel_block_room : [];
  };

  // Event handler for when the hostel selection dropdown changes.
  const handleHostelChange = (e) => {
    setSelectedHostelName(e.target.value); // Update state with the selected hostel's name
    // Reset dependent selections and details to ensure a clean state for the new hostel
    setHostelDetails(null);
    setSelectedBlockId('');
    setSelectedRoomId('');
    setMessage(''); // Clear previous messages
  };

  // Event handler for when the block selection dropdown changes.
  const handleBlockChange = (e) => {
    setSelectedBlockId(e.target.value); // Update state with the selected block's ID
    setSelectedRoomId(''); // Reset room selection when block changes
  };

  // Event handler for when the room selection dropdown changes.
  const handleRoomChange = (e) => {
    setSelectedRoomId(e.target.value); // Update state with the selected room's ID
    console.log("Selected Room ID:", e.target.value);
    console.log("Student ID:", studentId);
  };

  // Event handler for the "Book Now" button submission.
  const handleBookNow = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage('Processing your booking...');
    setError(null); // Clear any previous errors

    // Frontend pre-check: If student is already booked, prevent submission and show message.
    if (isStudentBooked) {
      setMessage('❌ You have already booked an accommodation.');
      return;
    }

    // Basic validation: Check if student is logged in and a room is selected.
    if (!studentId || !token) {
      setMessage('❌ Authentication required. Please log in first.');
      return;
    }
    if (!selectedRoomId) {
      setMessage('❌ Please select a room to book.');
      return;
    }

    setLoading(true); // Set loading to true during booking process

    try {
      // Call the bookAccommodation API function with the selected room ID, student ID, and token.
      const bookingResponse = await bookAccommodation(selectedRoomId, studentId, token);
      setMessage('✅ Accommodation booked successfully!');
      console.log('Booking successful:', bookingResponse);
      // After successful booking, update the local state to reflect the new booking status.
      setIsStudentBooked(true); // Set student as booked
      // Optional: You might want to clear selections, redirect the user, or update UI further here.
    } catch (err) {
      console.error("Error during booking:", err);
      // Check for the specific conflict error (HTTP 409) from the backend.
      if (err.response?.status === 409) {
        setError(err.response?.data?.error || "You have already booked an accommodation.");
        setMessage('❌ ' + (err.response?.data?.error || "You have already booked an accommodation."));
        setIsStudentBooked(true); // Ensure UI updates if backend confirms existing booking
      } else {
        // Handle other types of errors (e.g., 400, 500)
        setError(err.response?.data?.error || "Failed to book accommodation. Please try again.");
        setMessage('❌ ' + (err.response?.data?.error || "Failed to book accommodation. Please try again."));
      }
    } finally {
      setLoading(false); // Set loading to false after booking attempt
    }
  };

  // Render logic for initial loading of booking status.
  // This ensures the UI shows a "checking status" message before rendering the form.
  if (checkingBookingStatus) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Checking your booking status...</p>
      </div>
    );
  }

  // Render logic for general errors that prevent the form from being displayed.
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl my-10 font-sans">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Hostel & Room Booking
      </h2>

      <form onSubmit={handleBookNow} className="space-y-6">
        {/* Hostel Selection Dropdown */}
        <div>
          <label htmlFor="hostelSelect" className="block text-lg font-medium text-gray-700 mb-2">
            Select Hostel:
          </label>
          <select
            id="hostelSelect"
            value={selectedHostelName}
            onChange={handleHostelChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            // Disable if student is already booked or if any loading is in progress
            disabled={isStudentBooked || loading}
          >
            <option value="">-- Choose a Hostel --</option>
            {initialHostelOptions.map(hostel => (
              <option key={hostel.name} value={hostel.name}>
                {hostel.name} ({hostel.gender})
              </option>
            ))}
          </select>
        </div>

        {/* Display selected hostel's gender if details are loaded */}
        {hostelDetails && (
          <p className="text-center text-gray-600 mb-6">
            Gender: {hostelDetails.gender}
          </p>
        )}

        {/* Block Selection Dropdown (Conditional rendering) */}
        {/* Renders only if a hostel is selected, its details are loaded, and it has blocks */}
        {selectedHostelName && hostelDetails && hostelDetails.hostel_block && hostelDetails.hostel_block.length > 0 && (
          <div>
            <label htmlFor="blockSelect" className="block text-lg font-medium text-gray-700 mb-2">
              Select Block:
            </label>
            <select
              id="blockSelect"
              value={selectedBlockId}
              onChange={handleBlockChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              // Disable if student is already booked or if any loading is in progress
              disabled={isStudentBooked || loading}
            >
              <option value="">-- Choose a Block --</option>
              {hostelDetails.hostel_block.map(block => (
                <option key={block.id} value={block.id}>
                  {block.name.replace(/_/g, ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Room Selection Dropdown (Conditional rendering) */}
        {/* Renders only if a block is selected, hostel details are loaded, and there are rooms in the block */}
        {selectedBlockId && hostelDetails && getRoomsForCurrentBlock().length > 0 && (
          <div>
            <label htmlFor="roomSelect" className="block text-lg font-medium text-gray-700 mb-2">
              Select Room:
            </label>
            <select
              id="roomSelect"
              value={selectedRoomId}
              onChange={handleRoomChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              // Disable if student is already booked or if any loading is in progress
              disabled={isStudentBooked || loading}
            >
              <option value="">-- Choose a Room --</option>
              {getRoomsForCurrentBlock().map(room => (
                <option key={room.id} value={room.id}>
                  {room.name.toUpperCase()} (Max Capacity: {room.max_capacity})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Book Now Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          // Button is disabled if:
          // - No room is selected
          // - Student ID or token is missing (not logged in)
          // - Any loading is in progress (fetching details or booking)
          // - Student is already booked
          disabled={!selectedRoomId || !studentId || loading || isStudentBooked}
        >
          {loading ? 'Processing...' : (isStudentBooked ? 'Already Booked' : 'Book Now')}
        </button>
      </form>

      {/* Message Display (for success, loading, or specific errors) */}
      {message && (
        <p className={`mt-6 text-center text-lg font-semibold ${message.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default HostelAndRoomBooking;
