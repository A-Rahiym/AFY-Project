import express from 'express';
import { getHostelsController, getAllHostelsController,bookAccommodation,checkBookingStatus } from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostelsController);
hostelRouter.get('/booking-status/:student_id', checkBookingStatus);
hostelRouter.get('/', getAllHostelsController);
hostelRouter.post('/book', bookAccommodation);
export default hostelRouter;