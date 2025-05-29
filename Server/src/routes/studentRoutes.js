// routes/studentRoutes.js
import express from 'express';
import {
  registerStudent,
  loginStudent,
  // assignToken,
  getProfile,
  updatePaymentStatus,
  handleAccommodationSelection
} from '../controllers/studentController.js';
import accommodationAuthMiddleware from '../middleware/authMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import studentProfileMiddleware from '../middleware/studentProfileMiddleware.js';

const studentRouter = express.Router();
// Register a new student
studentRouter.post('/register', registerStudent);
// Get a student by registration number
studentRouter.post('/login', loginStudent);
// Assign token to student
studentRouter.put('/payment-status/:student_id',authMiddleware, updatePaymentStatus);
// router.put('/:reg_number', assignToken);
studentRouter.post('/select-accommodation', accommodationAuthMiddleware, handleAccommodationSelection);
// Get student profile
studentRouter.get('/profile', studentProfileMiddleware, getProfile);
export default studentRouter;