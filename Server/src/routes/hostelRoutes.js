import express from 'express';
import { getHostelsController, bookAccommodation,checkBookingStatus } from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostelsController);
hostelRouter.get('/booking-status/:student_id', checkBookingStatus);
hostelRouter.post('/book', bookAccommodation);
export default hostelRouter;