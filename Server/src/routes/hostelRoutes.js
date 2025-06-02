import express from 'express';

import { getHostelsController, 
    getAllHostelsController,
    bookAccommodation,
    checkBookingStatus,
    getAvailableHostelRooms
} from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostelsController);
hostelRouter.get('/booking-status/:student_id', checkBookingStatus);
hostelRouter.get('/', getAllHostelsController);
hostelRouter.post('/book', bookAccommodation);
hostelRouter.get('/rooms/:hostelId', getAvailableHostelRooms);
// hostelRouter.post('/book');
export default hostelRouter;