import axiosInstance from "./axiosInstance";



export const getHostelDetails = async (param) => {
  try {
    let res;
    if (param === 'all') {
      res = await axiosInstance.get('/hostels/'); // Call the new /api/hostels/ endpoint
    } else {
      res = await axiosInstance.get(`/hostels/${param}`); // Call the existing /api/hostels/:name endpoint
    }
    return res.data;
  } catch (error) {
    console.error(`Error fetching hostel details for param "${param}":`, error.response?.data || error.message);
    throw error;
  }
};


export const checkBooking = async (studentId, token) => {
  const res = await axiosInstance.get(`/hostels/booking-status/${studentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const bookAccommodation = async (roomId, studentId, token) => {
  console.log("Attempting to book accommodation..."); // Log for debugging
  const res = await axiosInstance.post(
    '/hostels/book', // Endpoint for booking
    { room_id: roomId, student_id: studentId }, // Body of the request
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Ensure Content-Type is set
      },
    }
  );
  return res.data;
};