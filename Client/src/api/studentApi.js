// src/api/studentApi.js
import axiosInstance from './axiosInstance';

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

// Update payment status
export const updatePaymentStatus = async (regNumber, statusData) => {
  const res = await axiosInstance.put(`/payment-status/${regNumber}`, statusData);
  return res.data;
};

// Select accommodation (needs auth)
export const selectAccommodation = async (accommodationData) => {
  const res = await axiosInstance.post('/select-accommodation', accommodationData);
  return res.data;
};
