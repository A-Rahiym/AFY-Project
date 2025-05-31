import {
  getHostelDetailsModel,
  createHostelBooking,
  checkExistingBooking,
  isRoomFull,
  getAllHostels,
  getStudentBooking
} from "../models/hostelModel.js";

export const getHostelsController = async (req, res) => {
  const { hostelName } = req.params;
  try {
    const decodedHostelName = decodeURIComponent(hostelName); // decode '%20' to space
    const hostelDetails = await getHostelDetailsModel(decodedHostelName);
    if (!hostelDetails) {
      return res
        .status(404)
        .json({ success: false, error: "Hostel not found" });
    }
    res.status(200).json({ success: true, hostel: hostelDetails });
  } catch (error) {
    console.error("Failed to fetch hostel details:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};




export const bookAccommodation = async (req, res) => {
  const { room_id, student_id } = req.body;

  if (!room_id || !student_id) {
    return res
      .status(400)
      .json({ success: false, error: "Room ID and Student ID are required." });
  }

  try {
    // ✅ Check if student has an existing booking
    // const existingBooking = await checkExistingBooking(student_id);

    // if (existingBooking) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Student has already booked a hostel.",
    //   });
    // }

    const roomIsFull = await isRoomFull(room_id);
    if (roomIsFull) {
      return res
        .status(400)
        .json({ success: false, error: "This room is already full." });
    }

    // Proceed to create a new booking
    const newBooking = await createHostelBooking(room_id, student_id);
    res.status(201).json({
      success: true,
      message: "Accommodation booked successfully.",
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getAllHostelsController = async (req, res) => {
    try {
        const hostels = await getAllHostels();
        res.status(200).json({ success: true, hostels });
    } catch (error) {
        console.error('Error in getAllHostelsController:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};


// export const checkBookingStatus = async (req, res) => {
//   const { student_id } = req.params;

//   if (!student_id) {
//     return res.status(400).json({ success: false, error: 'Student ID is required.' });
//   }
//   try {
//     const booking = await getStudentBooking(student_id);

//     if (!booking) {
//       return res.status(200).json({
//         success: true,
//         booked: false,
//         message: 'You have not booked any room yet.'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       booked: true,
//       booking: booking,
//       message: 'You have already booked a room.'
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };


export const checkBookingStatus = async (req, res) => {
    const { student_id } = req.params;

    if (!student_id) {
        return res.status(400).json({ success: false, error: 'Student ID is required.' });
    }

    try {
        // Use the comprehensive checkExistingBooking from studentModel.js
        const { isBooked, assignedRoomId, hasPaid} = await checkExistingBooking(student_id);
        // Return all relevant status flags to the frontend
        res.status(200).json({
            success: true,
            isBooked: isBooked,         // Whether a room is assigned
            assignedRoomId: assignedRoomId, // The ID of the assigned room, if any
            hasPaid: hasPaid,           // Whether school fees are paid
        });

    } catch (error) {
        console.error('Error in checkBookingStatusController:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};