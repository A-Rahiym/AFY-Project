// src/components/ViewProfile.js
import { useState, useEffect } from "react";
import { getStudentProfile } from "../api/studentApi";

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const studentId = localStorage.getItem("studentId");

      if (!token || !studentId) {
        setMessage("❌ Not authenticated. Please login first.");
        return;
      }

      try {
        const data = await getStudentProfile(studentId, token); // Pass both id and token
        setProfile(data);
      } catch (err) {
        setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
      }
    };

    fetchProfile();
  }, []);

  if (message) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-center">{message}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-lg font-semibold text-center">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Student Profile
      </h2>
      <div className="mb-6">
        <div className="mb-4">
          <strong className="text-lg">Name:</strong>
          <p className="text-gray-600">{profile.name}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Registration Number:</strong>
          <p className="text-gray-600">{profile.reg_number}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Department:</strong>
          <p className="text-gray-600">{profile.department}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Faculty:</strong>
          <p className="text-gray-600">{profile.faculty}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Level:</strong>
          <p className="text-gray-600">{profile.level}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Gender:</strong>
          <p className="text-gray-600">{profile.gender}</p>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Payment Status:</strong>
          <p
            className={`text-gray-600 ${
              profile.has_paid ? "text-green-500" : "text-red-500"
            }`}
          >
            {profile.has_paid ? "Paid" : "Not Paid"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
