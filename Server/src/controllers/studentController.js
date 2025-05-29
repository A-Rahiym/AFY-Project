// controllers/studentController.js
import {
  createStudent,
  getStudentById,
  updateStudentToken,
  markStudentAsPaid,
  // getStudentByToken,
  updateStudentPayment,
  getStudentByRegNo,
  selectAccommodation
} from '../models/studentModel.js';

import generateToken from '../utils/generatetoken.js';
import bcrypt from 'bcryptjs';


export const registerStudent = async (req, res) => {
  const {
    name,
    reg_number,
    department,
    faculty,
    level,
    gender,
    password,
    student_type,
    is_official,
    is_disabled
  } = req.body;

  try {
    const student = await createStudent({
      name,
      reg_number,
      department,
      faculty,
      level,
      gender,
      password,
      student_type,
      is_official,
      is_disabled
    });

    const token = generateToken({ reg_number }, '1h');
    res.status(201).json({ success: true, student, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  const { reg_number, password } = req.body;
  try {
    // Find the student by reg_number
    const student = await getStudentByRegNo(reg_number);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = generateToken({ reg_number });
    // Send the student data and token
    res.status(200).json({
      success: true,
      student: { id: student.id, name: student.name, reg_number: student.reg_number, gender: student.gender, department: student.department, faculty: student.faculty, level: student.level, has_paid: student.has_paid, token: student.token, assigned_room_id: student.assigned_room_id, student_type: student.student_type, is_official: student.is_official, is_disabled: student.is_disabled},
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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