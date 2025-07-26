// src/api/studentApi.js
import axiosInstance from './axiosInstance';


const token = localStorage.getItem('studentToken');


// Register
export const registerStudent = async (studentData) => {
  const res = await axiosInstance.post('/student/register', studentData);
  return res.data;
};

// Login
export const loginStudent = async (loginData) => {
  console.log(loginData)
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

export const getStudentProfile = async (id) => {
  console.log(id, token);
  const res = await axiosInstance.get(`/student/profile?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

/**
 * Submits a student's hostel choices to the backend.
 * This function expects the studentId to be part of the URL path as a parameter.
 * @param {string} studentId - The UUID of the student (passed in URL).
 * @param {object} choices - An object containing choice1Id, choice2Id, choice3Id (passed in request body).
 * @returns {Promise<object>} The response data from the backend.
 * @throws {Error} If the API call fails.
 */
export const submitHostelChoices = async (studentId, choices) => {
  // The URL matches the backend route POST /api/students/:studentId/submit-choices
  // As per our previous discussions, studentId is in the URL path,
  // and the choices object ({ choice1Id, choice2Id, choice3Id }) is in the request body.
  const res = await axiosInstance.post(
    `/student/${studentId}/submit-choices`, // Endpoint to which the choices are sent
    choices, // The body of the request containing the choices
    {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`, // <-- UNCOMMENT THIS IF YOU RE-INTRODUCE 'protect' MIDDLEWARE
      },
    }
  );
  return res.data;
};



// // Select accommodation (needs auth)
// export const selectAccommodation = async (accommodationData) => {
//   const res = await axiosInstance.post('/select-accommodation', accommodationData);
//   return res.data;
// };
