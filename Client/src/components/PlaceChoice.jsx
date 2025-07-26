// src/components/PlaceChoice.jsx
import React, { useState } from 'react';
import { submitHostelChoices } from '../api/studentApi';

const PlaceChoice = ({
  studentId,
  onChoicesSubmitted,
  setGlobalError,
  setGlobalMessage,
  hostelOptions,
  loadingHostelOptions,
  hostelOptionsError,
}) => {
  const [choice1Id, setChoice1Id] = useState('');
  const [choice2Id, setChoice2Id] = useState('');
  const [choice3Id, setChoice3Id] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setGlobalError(null);

    if (!choice1Id && !choice2Id && !choice3Id) {
      setMessage('❌ Please select at least one hostel choice.');
      return;
    }

    setSubmitting(true);
    setMessage('Submitting your choices...');

    try {
      const choices = {
        choice1Id: choice1Id || null,
        choice2Id: choice2Id || null,
        choice3Id: choice3Id || null,
      };

      const response = await submitHostelChoices(studentId, choices);
      const successMsg = '✅ ' + response.message;
      setMessage(successMsg);
      setGlobalMessage(successMsg);
      onChoicesSubmitted();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to submit choices. Please try again.";
      setMessage('❌ ' + errorMessage);
      setGlobalError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStatusMessage = () => {
    if (!message) return null;

    const isSuccess = message.startsWith('✅');
    const isError = message.startsWith('❌');

    return (
      <div className={`mt-4 p-3 rounded-md text-center text-sm font-medium
        ${isSuccess ? 'bg-green-100 text-green-800' :
          isError ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'}`}>
        {message}
      </div>
    );
  };

  if (loadingHostelOptions) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm my-10">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700 mb-4"></div>
        <p className="text-base text-gray-600">Loading hostel options...</p>
      </div>
    );
  }

  if (hostelOptionsError) {
    return (
      <div className="bg-red-100 text-red-800 text-center p-6 rounded-xl max-w-xl mx-auto my-10 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Error Loading Hostels</h2>
        <p>{hostelOptionsError}</p>
        <p className="text-sm mt-2 text-gray-600">Try refreshing the page or contact support.</p>
      </div>
    );
  }

  if (hostelOptions.length === 0) {
    return (
      <div className="bg-yellow-100 text-yellow-800 text-center p-6 rounded-xl max-w-xl mx-auto my-10 shadow-md">
        <h2 className="text-xl font-semibold mb-2">No Hostels Available</h2>
        <p>No hostels found based on your gender and campus.</p>
        <p className="text-sm mt-2 text-gray-600">Contact admin if you believe this is an error.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md max-w-2xl mx-auto p-8 mt-12">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Choose Your Hostel Preferences</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Please select your top 3 preferred hostels. Placement will follow first come, first served basis after payment verification.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* First Choice */}
        <div>
          <label htmlFor="choice1" className="block text-sm font-medium text-gray-700 mb-1">
            First Choice <span className="text-red-500">*</span>
          </label>
          <select
            id="choice1"
            value={choice1Id}
            onChange={(e) => setChoice1Id(e.target.value)}
            disabled={submitting}
            required
            className="w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select 1st preference --</option>
            {hostelOptions.map(hostel => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender})
              </option>
            ))}
          </select>
        </div>

        {/* Second Choice */}
        <div>
          <label htmlFor="choice2" className="block text-sm font-medium text-gray-700 mb-1">
            Second Choice (Optional)
          </label>
          <select
            id="choice2"
            value={choice2Id}
            onChange={(e) => setChoice2Id(e.target.value)}
            disabled={submitting}
            className="w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select 2nd preference --</option>
            {hostelOptions.map(hostel => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender})
              </option>
            ))}
          </select>
        </div>

        {/* Third Choice */}
        <div>
          <label htmlFor="choice3" className="block text-sm font-medium text-gray-700 mb-1">
            Third Choice (Optional)
          </label>
          <select
            id="choice3"
            value={choice3Id}
            onChange={(e) => setChoice3Id(e.target.value)}
            disabled={submitting}
            className="w-full border rounded-md px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select 3rd preference --</option>
            {hostelOptions.map(hostel => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name} ({hostel.gender})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting || (!choice1Id && !choice2Id && !choice3Id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Hostel Preferences'}
        </button>
      </form>

      {renderStatusMessage()}
    </div>
  );
};
export default PlaceChoice;