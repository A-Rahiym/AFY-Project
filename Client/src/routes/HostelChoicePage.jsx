// src/pages/HostelChoicePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // No longer using useParams
import PlaceChoice from '../components/PlaceChoice'; // Your self-contained PlaceChoice component
import { getStudentProfile } from '../api/studentApi'; // To get student details (to check choices)
// import { checkBooking } from '../api/hostelApi'; // To check if student is already booked

const HostelChoicePage = () => {
  const navigate = useNavigate();

  // Get studentId and token directly from localStorage
  const studentId = localStorage.getItem('studentId');
  const token = localStorage.getItem('token') || null;

  // State for this page's loading, errors, and messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  // State to control if PlaceChoice should be rendered
  const [shouldRenderPlaceChoice, setShouldRenderPlaceChoice] = useState(false);

  useEffect(() => {
    const performInitialChecks = async () => {
      setLoading(true);
      setError(null);
      setMessage('');

      // --- 1. Basic Check: Student ID must exist in localStorage ---
      if (!studentId) {
        setError('Student ID not found. Please log in to access this page.');
        setMessage('❌ Student ID not found. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
        setLoading(false); // Stop loading to show error/message
        return;
      }

      try {
        // --- 2. Check if student has already been assigned a hostel ---
        // This is a useful check to avoid showing the choice form if already assigned
        // const bookingStatus = await checkBooking(studentId, token);
        // if (bookingStatus.booked) {
        //   setMessage('You have already been assigned accommodation. Redirecting to your status page...');
        //   setTimeout(() => navigate('/accommodation-payment'), 10000);
        //   return; // Stop further checks and wait for redirect
        // }


        // --- 3. Check if student has already submitted hostel choices ---
        // This is crucial to prevent re-submission of choices
        const studentProfile = await getStudentProfile(studentId, token);
        if (studentProfile.choice1_hostel_id || studentProfile.choice2_hostel_id || studentProfile.choice3_hostel_id) {
          setMessage('Your hostel choices have already been submitted. Redirecting to your status page...');
          setTimeout(() => navigate('/accommodation-payment'), 2000);
          return; // Stop further checks and wait for redirect
        }

        // If none of the above conditions met, student is eligible to make choices
        setShouldRenderPlaceChoice(true);
        setMessage('Please select your top 3 hostel choices.');
      } catch (err) {
        console.error("Error during initial page checks:", err);
        const errorMessage = err.response?.data?.error || "Failed to load page. Please try again.";
        setError(errorMessage);
        setMessage('❌ ' + errorMessage);
        // If there's an API error during these checks, it might be a server issue or invalid token
        // Consider more specific error handling or redirect to login
        // setTimeout(() => navigate('/login'), 3000);
      } finally {
        setLoading(false);
      }
    };

    performInitialChecks();
  }, [studentId, token, navigate]); // Dependencies: re-run if studentId, token, or navigate changes

  // Callback after choices are successfully submitted from PlaceChoice component
  const handleChoicesSubmitted = () => {
    setMessage('✅ Your hostel choices have been submitted successfully! Redirecting...');
    setTimeout(() => navigate('/accommodation-payment'), 2000); // Redirect to status page after submission
  };

  // --- Render Logic for the Page ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4 mx-auto"></div>
          <p className="text-xl text-gray-700 font-medium">{message || "Loading page..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
  }

  // Display status message if PlaceChoice is not meant to be rendered yet (e.g., during redirect)
  if (!shouldRenderPlaceChoice) {
    const isSuccessMessage = message.startsWith('✅');
    const messageBgColor = isSuccessMessage ? 'bg-green-100' : 'bg-blue-100';
    const messageTextColor = isSuccessMessage ? 'text-green-800' : 'text-blue-800';

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Status Update</h2>
          <div className={`mt-4 p-3 rounded-md ${messageBgColor} ${messageTextColor} text-center text-sm font-medium`}>
              {message}
          </div>
          {message.includes('Redirecting') && (
            <p className="mt-4 text-gray-600">Please wait while we take you to the correct page...</p>
          )}
        </div>
      </div>
    );
  }

  // If all checks pass and shouldRenderPlaceChoice is true, render the PlaceChoice component
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <PlaceChoice
        studentId={studentId} // Pass the studentId obtained from localStorage
        onChoicesSubmitted={handleChoicesSubmitted}
        setGlobalError={setError}   // Allows PlaceChoice to set error state for this page
        setGlobalMessage={setMessage} // Allows PlaceChoice to set message state for this page
      />
    </div>
  );
};

export default HostelChoicePage;