import jwt from 'jsonwebtoken';
import { getStudentByRegNumber } from '../models/studentModel.js';

export const accommodationAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decode the token to get reg_number
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { reg_number } = decoded;

    // Get student by reg_number
    const student = await getStudentByRegNumber(reg_number);

    // Collect errors
    const errors = [];
    if (!student) {
      errors.push('Student not found');
    } else if (!student.has_paid) {
      errors.push('Access denied: Payment not completed');
    }

    if (errors.length > 0) {
      return res.status(403).json({ success: false, errors });
    }

    // Attach student to request
    req.student = student;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
};
