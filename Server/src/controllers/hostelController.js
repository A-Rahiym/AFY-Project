import { getHostelDetails } from "../models/hostelModel.js";
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