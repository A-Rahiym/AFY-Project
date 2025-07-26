import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHostelDetails } from '../api/hostelApi';
import { getStudentProfile } from '../api/studentApi';
import { useAuth } from '../context/AuthContext';

import HostelFormSection from '../components/HostelChoice/HostelFormSecton'
import ErrorScreen from '../components/HostelChoice/ErrorScreen';
import LoadingScreen from '../components/HostelChoice/LoadingScreen';
import StatusMessage from '../components/HostelChoice/StatusMessage';

const REDIRECT_DELAY = 2000;

const HostelChoicePage = () => {
  const navigate = useNavigate();
  const {
    studentId,
    token,
    studentGender,
    userCampus,
    isAuthenticated,
    assignedRoomId,
  } = useAuth();

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [shouldRenderForm, setShouldRenderForm] = useState(false);
  const [loadingChecks, setLoadingChecks] = useState(true);
  const [loadingHostels, setLoadingHostels] = useState(false);
  const [hostelOptions, setHostelOptions] = useState([]);
  const [hostelError, setHostelError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  useEffect(() => {
    let timeout;

    const init = async () => {
      setLoadingChecks(true);
      setMessage('');
      setError(null);

      if (!isAuthenticated || !studentId) {
        setError('Student ID not found. Please log in.');
        setMessage('❌ Redirecting to login...');
        timeout = setTimeout(() => navigate('/studentLogin'), REDIRECT_DELAY);
        return;
      }

      if (!studentGender || !userCampus) {
        setError('Student gender or campus not found.');
        setMessage('❌ Please complete your profile.');
        return;
      }

      if (assignedRoomId) {
        setMessage('You have already been assigned accommodation.');
        return;
      }

      try {
        const profile = await getStudentProfile(studentId);
        const choices = [
          profile.choice1_hostel_id,
          profile.choice2_hostel_id,
          profile.choice3_hostel_id,
        ];

        if (choices.some((id) => id !== null && id !== undefined)) {
          setMessage('Your hostel choices have already been submitted.');
          return;
        }

        await fetchHostelOptions(profile.gender, profile.campus);
        setShouldRenderForm(true);
        setMessage('Please select your top 3 hostel choices.');
      } catch (err) {
        const msg = err?.response?.data?.error || err.message || 'Unexpected error.';
        setError(msg);
        setMessage('❌ ' + msg);
      } finally {
        setLoadingChecks(false);
      }
    };

    const fetchHostelOptions = async (gender, campus) => {
      setLoadingHostels(true);
      setHostelError(null);
      try {
        const response = await getHostelDetails(gender, campus);
        if (response.success && Array.isArray(response.hostels)) {
          setHostelOptions(response.hostels);
        } else {
          throw new Error(response.error || 'Invalid hostel data format.');
        }
      } catch (err) {
        const msg = err?.response?.data?.error || err.message;
        setHostelError(msg);
      } finally {
        setLoadingHostels(false);
      }
    };

    init();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [studentId, token, isAuthenticated, assignedRoomId, navigate]);

  const handleChoicesSubmitted = () => {
    setMessage('✅ Your hostel choices have been submitted successfully! Redirecting...');
    setShouldRenderForm(false);
    const timeout = setTimeout(() => navigate('/Dashboard'), REDIRECT_DELAY);
    return () => clearTimeout(timeout);
  };

  if (loadingChecks) return <LoadingScreen message={message} />;
  if (error && !shouldRenderForm) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col justify-between">
      <main className="w-full max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-left">
          Hostel Selection
        </h1>

        {/* Section separator: Information */}
        <div className="text-center font-medium text-gray-700 mb-2">Information</div>
        <hr className="border border-gray-800 mb-8" />

        {/* Section separator: Choices */}
        <div className="text-center font-medium text-gray-700 mb-2">Choices</div>
        <hr className="border border-gray-800 mb-10" />

        {shouldRenderForm ? (
          <HostelFormSection
            hostelError={hostelError}
            loadingHostels={loadingHostels}
            hostelOptions={hostelOptions}
            studentId={studentId}
            handleChoicesSubmitted={handleChoicesSubmitted}
            onFinalSubmitClick={() => setShowConfirmModal(true)} // NEW
            setError={setError}
            setMessage={setMessage}
          />
        ) : (
          <StatusMessage message={message} />
        )}
      </main>

      <footer className="text-center py-4 text-gray-500 text-sm border-t border-gray-200">
        © 2025 Ahmadu Bello University Zaria. All rights reserved.
      </footer>
    </div>
  );
};

export default HostelChoicePage;
