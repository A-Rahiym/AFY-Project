import React from 'react';
import PlaceChoice from '../PlaceChoice';

const HostelFormSection = ({
  hostelError,
  loadingHostels,
  hostelOptions,
  studentId,
  handleChoicesSubmitted,
  setError,
  setMessage,
  onFinalSubmitClick
}) => (
  <section className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">
      Choose Your Preferred Hostels
    </h2>

    {hostelError && (
      <div className="mt-4 p-3 rounded-md bg-red-100 text-red-800 text-center text-sm font-medium">
        ❌ Error loading hostel options: {hostelError}
      </div>
    )}

    {loadingHostels ? (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <p className="ml-4 text-gray-600">Loading hostel options...</p>
      </div>
    ) : (
      <PlaceChoice
        studentId={studentId}
        onChoicesSubmitted={handleChoicesSubmitted}
        setGlobalError={setError}
        setGlobalMessage={setMessage}
        hostelOptions={hostelOptions}
        loadingHostelOptions={loadingHostels}
        hostelOptionsError={hostelError}
      />
    )}
  </section>
);

export default HostelFormSection;
