// src/components/PlaceChoice.jsx
import React, { useState, useEffect } from 'react';
import { getHostelDetails } from '../api/hostelApi'; // To fetch list of all hostels
import { submitHostelChoices } from '../api/studentApi'; // To submit choices

const PlaceChoice = ({ studentId, onChoicesSubmitted, setGlobalError, setGlobalMessage }) => {
  const [hostelOptions, setHostelOptions] = useState([]);
  const [choice1Id, setChoice1Id] = useState('');
  const [choice2Id, setChoice2Id] = useState('');
  const [choice3Id, setChoice3Id] = useState('');
  const [loading, setLoading] = useState(true); // Initial loading for hostel options
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [message, setMessage] = useState(''); // Local message for this component

  // Effect to fetch all hostel options for the dropdowns
  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      setMessage('');
      setGlobalError(null); // Clear any global errors from parent page
      try {
        // Calling the updated getHostelDetails function with 'all'
        // This hits your new GET /api/hostels/ endpoint
        const response = await getHostelDetails('all');
        console.log("Response from getHostelDetails:", response.hostels);

        // Ensure response structure matches: { success: true, hostels: [...] }
        if (response.success && Array.isArray(response.hostels)) {
          // Filter out any hostels that might be missing critical data for dropdowns
          const validHostels = response.hostels.filter(h => h.id && h.name);
          setHostelOptions(validHostels);
          setMessage('Please select your top 3 hostel choices.');
        } else {
          throw new Error('Invalid response format for hostels.');
        }
      } catch (err) {
        console.error("Error fetching hostel options:", err);
        const errorMessage = err.response?.data?.error || "Failed to load hostel options. Please refresh.";
        setGlobalError(errorMessage); // Set global error via parent's prop
        setMessage('❌ ' + errorMessage); // Set local message for display within this component
      } finally {
        setLoading(false);
      }
    };
    fetchHostels();
  }, [setGlobalError, setGlobalMessage]); // Depend on setGlobalError/Message if they are from parent

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setGlobalError(null); // Clear global error before submission

    // Basic validation: At least one choice must be selected
    if (!choice1Id && !choice2Id && !choice3Id) {
      setMessage('❌ Please select at least one hostel choice.');
      return;
    }

    setSubmitting(true);
    setMessage('Submitting your choices...');

    try {
      const choices = {
        choice1Id: choice1Id || null, // Send null if not selected
        choice2Id: choice2Id || null,
        choice3Id: choice3Id || null,
      };

      // Assuming studentId is passed correctly as a prop from HostelChoicePage (its parent)
      const response = await submitHostelChoices(studentId, choices);
      setMessage('✅ ' + response.message);
      setGlobalMessage('✅ ' + response.message); // Update global message in parent (HostelChoicePage)
      onChoicesSubmitted(); // Callback to parent to update its state (e.g., trigger redirect)
    } catch (err) {
      console.error("Error submitting choices:", err);
      const errorMessage = err.response?.data?.error || "Failed to submit choices. Please try again.";
      setMessage('❌ ' + errorMessage);
      setGlobalError(errorMessage); // Update global error in parent (HostelChoicePage)
    } finally {
      setSubmitting(false);
    }
  };

  // --- INLINED Loading Spinner Logic ---
  // This block will be rendered if `loading` is true
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl my-10 font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
        <p className="text-xl text-gray-700 font-medium">{"Loading hostel options..."}</p>
      </div>
    );
  }

  // --- INLINED Status Message Logic ---
  // This function will render the status message based on the 'message' state
  const renderStatusMessage = () => {
    if (!message) return null; // Don't render if there's no message

    // Determine message type for styling (e.g., success, error, info)
    const isSuccess = message.startsWith('✅');
    const isError = message.startsWith('❌');

    let bgColor = 'bg-blue-100';
    let textColor = 'text-blue-800';

    if (isSuccess) {
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
    } else if (isError) {
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
    }

    return (
      <div className={`mt-4 p-3 rounded-md ${bgColor} ${textColor} text-center text-sm font-medium`}>
        {message}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl my-10 font-sans">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Hostel Preference Selection
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Select your top three preferred hostels from the options below.
        Automated assignment will follow FCFS priority based on your payment verification.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Choice 1 */}
        <div>
          <label htmlFor="choice1" className="block text-lg font-medium text-gray-700 mb-2">
            First Choice Hostel:
          </label>
          <select
            id="choice1"
            value={choice1Id}
            onChange={(e) => setChoice1Id(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
            required // Make the first choice mandatory
          >
            <option value="">-- Select your 1st preference --</option>
            {hostelOptions.map(hostel => (
              // Using hostel.gender_type for display, as per the new endpoint response
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender_type})
              </option>
            ))}
          </select>
        </div>

        {/* Choice 2 */}
        <div>
          <label htmlFor="choice2" className="block text-lg font-medium text-gray-700 mb-2">
            Second Choice Hostel (Optional):
          </label>
          <select
            id="choice2"
            value={choice2Id}
            onChange={(e) => setChoice2Id(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          >
            <option value="">-- Select your 2nd preference --</option>
            {hostelOptions.map(hostel => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender_type})
              </option>
            ))}
          </select>
        </div>

        {/* Choice 3 */}
        <div>
          <label htmlFor="choice3" className="block text-lg font-medium text-gray-700 mb-2">
            Third Choice Hostel (Optional):
          </label>
          <select
            id="choice3"
            value={choice3Id}
            onChange={(e) => setChoice3Id(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={submitting}
          >
            <option value="">-- Select your 3rd preference --</option>
            {hostelOptions.map(hostel => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender_type})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={submitting || (!choice1Id && !choice2Id && !choice3Id)}
        >
          {submitting ? 'Submitting...' : 'Submit Choices'}
        </button>
      </form>

      {renderStatusMessage()} {/* Call the inlined status message function */}
    </div>
  );
};

export default PlaceChoice;