import { getHostelDetails , createHostelBooking} from "../models/hostelModel.js";
export const getHostels = async (req, res) => {
  // Extract hostelName from the URL parameters
  const { hostelName } = req.params;

  try {
    // Call the model function to fetch the detailed hostel data
    const hostelDetails = await getHostelDetails(hostelName);

    // Send the retrieved data as a successful JSON response
    res.status(200).json({ success: true, hostel: hostelDetails });
  } catch (error) {
    // If an error occurs (e.g., hostel not found, database error),
    // send an appropriate error response.
    res.status(404).json({ success: false, error: error.message });
  }
};



export const bookAccommodation = async (req, res) => {
  const { room_id, user_id } = req.body; // Expecting these IDs from the client

  // Basic validation (you might want more robust validation with a library like Joi or Zod)
  if (!room_id || !user_id) {
    return res.status(400).json({ success: false, error: 'Room ID and User ID are required.' });
  }
  try {
    // Call the model function to create the booking
    const newBooking = await createHostelBooking(room_id, user_id);
    // Send a success response with the new booking details
    res.status(201).json({
      success: true,
      message: 'Accommodation booked successfully.',
      booking: newBooking
    });
  } catch (error) {
    // Handle any errors that occur during the booking process
    res.status(500).json({ success: false, error: error.message });
  }
};