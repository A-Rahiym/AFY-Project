// src/controllers/authController.js
import { findAdminByEmail, createAdminUser } from '../models/adminModel.js'; // NEW IMPORTS
import {createStudent,getStudentByRegNo} from '../models/studentModel.js'
import { comparePasswords, hashPassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';
import bcrypt from 'bcryptjs';

/**
 * Handles admin user login.
 * Verifies credentials against 'admin_users' table and issues a JWT token.
 * @param {object} req - Express request object (expects email, password in body).
 * @param {object} res - Express response object.
 */
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    try {
        const adminUser = await findAdminByEmail(email); // Use admin model

        if (!adminUser || !(await comparePasswords(password, adminUser.password_hash))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        // Implicitly, if found in admin_users, userType is 'admin'
        const token = generateToken(adminUser, 'admin'); // Pass userType 'admin'

        res.status(200).json({
            success: true,
            message: 'Admin login successful.',
            token,
            user: {
                id: adminUser.id,
                email: adminUser.email,
                userType: 'admin', // Explicitly state type in response
            },
        });

    } catch (error) {
        console.error('Error during admin login:', error.message);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
};

/**
 * Handles student user login.
 * Verifies credentials against 'users' table and issues a JWT token.
 * @param {object} req - Express request object (expects email, password in body).
 * @param {object} res - Express response object.
 */
// export const studentLogin = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Email and password are required.' });
//     }
//     try {
//         const studentUser = await findStudentUserByEmail(email); // Use student user model

//         if (!studentUser || !(await comparePasswords(password, studentUser.password_hash))) {
//             return res.status(401).json({ success: false, message: 'Invalid email or password.' });
//         }

//         // Implicitly, if found in users, userType is 'student'
//         const token = generateToken(studentUser, 'student'); // Pass userType 'student'

//         res.status(200).json({
//             success: true,
//             message: 'Student login successful.',
//             token,
//             user: {
//                 id: studentUser.id,
//                 email: studentUser.email,
//                 userType: 'student', // Explicitly state type in response
//             },
//         });

//     } catch (error) {
//         console.error('Error during student login:', error.message);
//         res.status(500).json({ success: false, message: 'Server error during login.' });
//     }
// };

// Optional: Admin registration endpoint (use createAdminUser)



export const adminRegister = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
    try {
        const existingAdmin = await findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(409).json({ success: false, message: 'Admin user with this email already exists.' });
        }
        const hashedPassword = await hashPassword(password);
        const newAdminUser = await createAdminUser({
            email,
            password_hash: hashedPassword,
        });
        res.status(201).json({
            success: true,
            message: 'Admin registered successfully.',
            user: { id: newAdminUser.id, email: newAdminUser.email, userType: 'admin' }
        });
    } catch (error) {
        console.error('Error during admin registration:', error.message);
        res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
};


export const registerStudent = async (req, res) => {
  const {
    name,
    reg_number,
    department,
    faculty,
    level,
    gender,
    password,
    campus,
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
      campus,
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
      student: { id: student.id, name: student.name, reg_number: student.reg_number, gender: student.gender, department: student.department, faculty: student.faculty, level: student.level, has_paid: student.has_paid, token: student.token, assigned_room_id: student.assigned_room_id, student_type: student.student_type, is_official: student.is_official, is_disabled: student.is_disabled,campus: student.campus},
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

