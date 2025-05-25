import axiosInstance from "./axiosInstance";



export const getHostelDetails = async (hostelName) => {
  const res = await axiosInstance.get(`/hostels/${hostelName}`);
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