import axiosInstance from "./axiosInstance";



export const getHostelDetails = async (gender, campus) => {
  try {
    // Construct the URL with query parameters for gender and campus
    // Example: /api/hostels?gender=FEMALE&campus=Main
    const res = await axiosInstance.get(`/hostels`, {
      params: {
        gender: gender,
        campus: campus,
      },
    });
    return res.data; // axios puts the response data in res.data
  } catch (error) {
    console.error(
      `Error fetching hostel details for gender "${gender}" and campus "${campus}":`,
      error.response?.data || error.message
    );
    // Re-throw the error so the calling component can handle it
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