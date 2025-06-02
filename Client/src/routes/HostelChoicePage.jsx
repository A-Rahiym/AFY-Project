// src/pages/HostelChoicePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceChoice from '../components/PlaceChoice';
import { getStudentProfile } from '../api/studentApi';
import { checkBooking, getHostelDetails } from '../api/hostelApi'; // Import getHostelDetails

const HostelChoicePage = () => {
    const navigate = useNavigate();

    const studentId = localStorage.getItem('studentId');
    const token = localStorage.getItem('token') || null;
    const studentGender = localStorage.getItem('studentGender'); // From localStorage
    const studentCampus = localStorage.getItem('userCampus'); // Assuming this is also in localStorage

    const [loadingInitialChecks, setLoadingInitialChecks] = useState(true); // For initial eligibility checks
    const [loadingHostelOptions, setLoadingHostelOptions] = useState(false); // For fetching hostel options
    const [hostelOptionsError, setHostelOptionsError] = useState(null); // Error for hostel options fetch
    const [hostelOptions, setHostelOptions] = useState([]); // State to hold hostel options

    const [error, setError] = useState(null); // General page error
    const [message, setMessage] = useState(''); // General page message
    const [shouldRenderPlaceChoice, setShouldRenderPlaceChoice] = useState(false);

    // Effect for initial eligibility checks
    useEffect(() => {
        const performInitialChecks = async () => {
            setLoadingInitialChecks(true);
            setError(null);
            setMessage('');

            // --- 1. Basic Check: Student ID must exist in localStorage ---
            if (!studentId) {
                setError('Student ID not found. Please log in to access this page.');
                setMessage('❌ Student ID not found. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
                setLoadingInitialChecks(false);
                return;
            }

            // --- 2. Check for Gender/Campus in localStorage (required for fetching hostels) ---
            if (!studentGender || !studentCampus) {
                setError('Student gender or campus not found. Cannot proceed.');
                setMessage('❌ Missing student gender or campus details. Please ensure your profile is complete.');
                setLoadingInitialChecks(false);
                return;
            }

            try {
                // Fetch student profile first to check for already submitted choices.
                const studentProfile = await getStudentProfile(studentId, token);

                // --- NEW/RE-ENABLED CHECK: Payment Status and Booking Status ---
                const status = await checkBooking(studentId, token); // Assuming this checks both payment & booking status

                // Check if student has paid fees
                if (!status.hasPaid) {
                    setMessage('You have not completed your payment. Please complete payment to proceed.');
                    setTimeout(() => navigate('/accommodation-payment'), 3000); // Redirect to payment page
                    setLoadingInitialChecks(false);
                    return;
                }

                // Check if student is already booked/assigned accommodation
                if (status.isBooked || status.booked) { // Adjust property name as per your API
                    setMessage('You have already been assigned accommodation. Redirecting to your status page...');
                    // Assuming you have a route like '/accommodation-status'
                    // setTimeout(() => navigate('/accommodation-status'), 3000);
                    setLoadingInitialChecks(false);
                    return;
                }

                // --- Check if student has already submitted hostel choices ---
                if (studentProfile.choice1_hostel_id || studentProfile.choice2_hostel_id || studentProfile.choice3_hostel_id) {
                    setMessage('Your hostel choices have already been submitted. Redirecting to your status page...');
                    // setTimeout(() => navigate('/accommodation-status'), 3000);
                    setLoadingInitialChecks(false);
                    return;
                }

                // If all eligibility checks pass, then fetch hostel options
                await fetchHostelOptions(); // Call the new function to fetch hostels
                setShouldRenderPlaceChoice(true); // Now safe to render PlaceChoice
                setLoadingInitialChecks(false);
                setMessage('Please select your top 3 hostel choices.');

            } catch (err) {
                console.error("Error during initial page checks:", err);
                const errorMessage = err.response?.data?.error || "Failed to load page. Please try again.";
                setError(errorMessage);
                setMessage('❌ ' + errorMessage);
                setLoadingInitialChecks(false);
            }
        };

        // Function to fetch hostel options
        const fetchHostelOptions = async () => {
            setLoadingHostelOptions(true);
            setHostelOptionsError(null);
            try {
                // Ensure gender and campus are available before calling API
                if (!studentGender || !studentCampus) {
                    throw new Error("Student gender or campus not available to fetch hostel options.");
                }
                // Call getHostelDetails with the required gender and campus
                const response = await getHostelDetails(studentGender, studentCampus);
                console.log("Hostel options fetched:", response.hostels);

                if (response.success && Array.isArray(response.hostels)) {
                    // No client-side filtering here, as the backend already filtered by gender/campus
                    setHostelOptions(response.hostels);
                } else {
                    throw new Error(response.error || 'Invalid response format for hostels.');
                }
            } catch (err) {
                console.error("Error fetching hostel options:", err);
                const errorMessage = err.response?.data?.error || err.message || "Failed to load hostel options.";
                setHostelOptionsError(errorMessage); // Set error specifically for hostel options
            } finally {
                setLoadingHostelOptions(false);
            }
        };

        performInitialChecks(); // Start the entire process
    }, [studentId, token, studentGender, studentCampus, navigate]); // Added studentGender and studentCampus to dependencies

    // Callback after choices are successfully submitted from PlaceChoice component
    const handleChoicesSubmitted = () => {
        setMessage('✅ Your hostel choices have been submitted successfully! Redirecting...');
        setTimeout(() => navigate('/accommodation-status'), 2000); // Redirect to status page after submission
    };

    // --- Render Logic for the Page ---
    if (loadingInitialChecks) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-xl">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4 mx-auto"></div>
                    <p className="text-xl text-gray-700 font-medium">{message || "Checking eligibility..."}</p>
                </div>
            </div>
        );
    }

    if (error) { // General page error (e.g., student ID missing, profile fetch error)
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
                studentId={studentId}
                onChoicesSubmitted={handleChoicesSubmitted}
                setGlobalError={setError}      // Pass setError from parent
                setGlobalMessage={setMessage}  // Pass setMessage from parent
                // Pass hostel options and their loading/error states
                hostelOptions={hostelOptions}
                loadingHostelOptions={loadingHostelOptions}
                hostelOptionsError={hostelOptionsError}
            />
        </div>
    );
};

export default HostelChoicePage;