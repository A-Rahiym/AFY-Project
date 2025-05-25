import { getHostelDetailsModel,createHostelBooking} from "../models/hostelModel.js";

export const getHostelsController = async (req, res) => {
  const { hostelName } = req.params;
  try {
    const decodedHostelName = decodeURIComponent(hostelName); // decode '%20' to space
    const hostelDetails = await getHostelDetailsModel(decodedHostelName);
    if (!hostelDetails) {
      return res.status(404).json({ success: false, error: "Hostel not found" });
    }
    res.status(200).json({ success: true, hostel: hostelDetails });
  } catch (error) {
    console.error('Failed to fetch hostel details:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const bookAccommodation = async (req, res) => {
  const { room_id, student_id } = req.body; // Changed from user_id to student_id
  // Basic validation (you might want more robust validation with a library like Joi or Zod)
  if (!room_id || !student_id) {
    return res.status(400).json({ success: false, error: 'Room ID and Student ID are required.' });
  }
  try {
    const newBooking = await createHostelBooking(room_id, student_id); // Pass student_id
    res.status(201).json({
      success: true,
      message: 'Accommodation booked successfully.',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};