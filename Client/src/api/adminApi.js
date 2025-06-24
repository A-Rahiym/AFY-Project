// src/api/adminApi.js
import axiosInstance from './axiosInstance'; // Make sure this path is correct for your axiosInstance setup

// Helper to get the token, assuming it's stored in localStorage
const getToken = () => localStorage.getItem('token'); // Or adminToken, depending on your auth strategy

/**
 * Fetches a list of students who have requested hostel accommodation
 * and are not yet assigned a room.
 * @returns {Promise<Array>} A promise that resolves to an array of student objects.
 * @throws {Error} If the API call fails or authentication token is missing.
 */
export const getRequestedStudents = async () => {
    const token = getToken();
    if (!token) {
        throw new Error('Authentication token not found. Please log in as admin.');
    }
    try {
        const response = await axiosInstance.get('/admin/students/requested', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.students; // Assuming your backend returns { success: true, students: [...] }
    } catch (error) {
        console.error('Error fetching requested students:', error.response?.data || error.message);
        throw error; // Re-throw for component to handle
    }
};

/**
 * Submits a batch of student IDs to the backend for room assignment.
 * @param {Array<string>} studentIds - An array of student UUIDs to assign rooms to.
 * @returns {Promise<object>} A promise that resolves to the assignment summary and results.
 * @throws {Error} If the API call fails or authentication token is missing.
 */
export const assignRoomsToSelectedStudents = async (studentIds) => {
    const token = getToken();
    if (!token) {
        throw new Error('Authentication token not found. Please log in as admin.');
    }
    try {
        const response = await axiosInstance.post('/admin/assign-rooms', { studentIds }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        // Assuming your backend returns { success: true, message: ..., results: ..., summary: ... }
        return response.data;
    } catch (error) {
        console.error('Error assigning rooms to selected students:', error.response?.data || error.message);
        throw error; // Re-throw for component to handle
    }
};