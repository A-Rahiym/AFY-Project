// src/api/studentApi.js
import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');
// Register
export const registerStudent = async (studentData) => {
  const res = await axiosInstance.post('/student/register', studentData);
  return res.data;
};

// Login
export const loginStudent = async (loginData) => {
  const res = await axiosInstance.post('/student/login', loginData);
  return res.data;
};



export const updatePaymentStatus = async (studentId, paidStatus) => { // Changed parameter name

    if (!token) {
        throw new Error('Authentication token not found. Please log in.');
    }
    if (typeof paidStatus !== 'boolean') {
        throw new Error('paidStatus must be a boolean value.');
    }
    console.log(`Sending update for student ${studentId}: paidStatus = ${paidStatus}`); // Debugging
    const res = await axiosInstance.put(
        `/student/payment-status/${studentId}`, // Corrected URL to match backend route
        { paidStatus }, // Corrected payload to match backend expectation
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

// Select accommodation with token
export const selectAccommodation = async (formData, token) => {
  // const token = localStorage.getItem('token');
  const res = await axiosInstance.post(
    '/students/select-accommodation',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getStudentProfile = async (id, token) => {
  const res = await axiosInstance.get(`/student/profile?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};





// // Select accommodation (needs auth)
// export const selectAccommodation = async (accommodationData) => {
//   const res = await axiosInstance.post('/select-accommodation', accommodationData);
//   return res.data;
// };
