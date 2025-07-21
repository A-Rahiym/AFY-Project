// controllers/studentController.js
import {
  createStudent,
  getStudentById,
  markStudentAsPaid,
  getStudentDetails,
  updateStudentPayment,
  getStudentByRegNo,
  updateStudentHostelChoices,
  selectAccommodation,
  checkStudentEligibilityModel
} from '../models/studentModel.js';

import generateToken from '../utils/generatetoken.js';
import bcrypt from 'bcryptjs';


// export const assignToken = async (req, res) => {
//   const { reg_number } = req.params;
//   const  token  = generateToken({ reg_number });
//   try {
//     await updateStudentToken(reg_number, token);
//     res.status(200).json({ success: true, message: 'Token assigned' });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };


export const updatePayment = async (req, res) => {
  const { reg_number } = req.params;
  try {
    // Step 1: Update the student's payment status to "paid"
    await markStudentAsPaid(reg_number);
    // Step 2: Generate a new token for the student
    const token = generateToken({ reg_number });
    // Step 3: Assign the generated token to the student
    // await updateStudentToken(reg_number, token);
    // Step 4: Respond with success
    res.status(200).json({ 
      success: true, 
      message: 'Payment status updated and token assigned' 
    });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ success: false, error: error.message });
  }
};

export const handleAccommodationSelection = async (req, res) => {
  const { hostel, block, room } = req.body;
 const { reg_number } = req.student; // Comes from authMiddleware
  try {
    const selection = await selectAccommodation(reg_number, hostel, block, room);
    res.status(200).json({ success: true, message: 'Accommodation selected successfully', selection });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    const id = req.query.id; // Changed from req.body to req.query
    const student = await getStudentById(id);
    // Remove sensitive fields
    delete student.password;
    delete student.token;
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkStudentEligibility = async (req, res) => {
  try {
    const studentId = req.params.Id; 

    if (!studentId) {
      return res.status(400).json({ message: 'Student ID is required' });
    }

    const result = await checkStudentEligibilityModel(studentId);
    console.log("result: ",result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}



export const updatePaymentStatus = async (req, res) => {
    const { student_id } = req.params; // Get student ID from URL parameters
    const { paidStatus } = req.body;   // Get paidStatus from request body
    // Basic validation
    if (!student_id) {
        return res.status(400).json({ success: false, error: 'Student ID is required in URL parameters.' });
    }
    if (typeof paidStatus === 'undefined') {
        return res.status(400).json({ success: false, error: 'Payment status (paidStatus: boolean) is required in the request body.' });
    }
    if (typeof paidStatus !== 'boolean') {
        return res.status(400).json({ success: false, error: 'paidStatus must be a boolean value (true or false).' });
    }

    try {
        const success = await updateStudentPayment(student_id, paidStatus);

        if (success) {
            res.status(200).json({
                success: true,
                message: `Student ${student_id} payment status updated to ${paidStatus}.`
            });
            console.log(res)
        } else {
            // This case might be hit if updateStudentPaymentStatus returns false,
            // though our current model function throws an error on failure.
            res.status(404).json({ success: false, error: `Student with ID ${student_id} not found.` });
        }
    } catch (error) {
        console.error('Error updating student payment status:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const submitHostelChoices = async (req, res) => {
    // --- CHANGE IS HERE ---
    // Get student ID directly from the request body
    const { studentId } = req.params;
    const { choice1Id, choice2Id, choice3Id } = req.body;
    // --- END CHANGE ---
    // Basic validation: Check if studentId and at least one choice are provided
    if (!studentId) {
        return res.status(400).json({ success: false, error: 'studentId is required in the request body.' });
    }
    if (!choice1Id && !choice2Id && !choice3Id) {
        return res.status(400).json({
            success: false,
            error: 'At least one hostel choice (choice1Id, choice2Id, or choice3Id) must be provided.'
        });
    }

    try {
        // Step 1: Perform eligibility checks
        const student = await getStudentDetails(studentId); // Use studentId from body

        if (!student) {
            return res.status(404).json({ success: false, error: `Student with ID ${studentId} not found.` });
        }
        if (!student.has_paid || student.fcfs_id === null) {
            return res.status(403).json({
                success: false,
                error: 'You are not eligible to submit hostel choices. Please ensure your school fees are paid and FCFS ID is assigned.'
            });
        }
        if (student.assigned_room_id !== null) {
            return res.status(409).json({
                success: false,
                error: 'You have already been assigned a room. You cannot submit new choices.'
            });
        }

        // Step 2: Store the student's choices using the model function
        await updateStudentHostelChoices(studentId, choice1Id, choice2Id, choice3Id);

        // Step 3: Respond to the client
        return res.status(200).json({
            success: true,
            message: "Your hostel choices have been saved successfully. Please await automated assignment."
        });

    } catch (error) {
        console.error('Error in submitHostelChoicesController:', error.message);
        res.status(500).json({ success: false, error: 'Failed to process hostel choices. ' + error.message });
    }
};