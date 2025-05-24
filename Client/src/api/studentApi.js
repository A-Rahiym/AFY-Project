// src/api/studentApi.js
import axiosInstance from './axiosInstance';

const token = localStorage.getItem('token');
// Register
export const registerStudent = async (studentData) => {
  const res = await axiosInstance.post('/register', studentData);
  return res.data;
};

// Login
export const loginStudent = async (loginData) => {
  const res = await axiosInstance.post('/login', loginData);
  return res.data;
};



// Update payment status with token
export const updatePaymentStatus = async (reg_number, data) => {
  // const token = localStorage.getItem('token');
  console.log(token);
  const res = await axiosInstance.put(
    `/payment-status/${reg_number}`,
    data,
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
    '/select-accommodation',
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
  const res = await axiosInstance.get(`/profile?id=${id}`, {
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
