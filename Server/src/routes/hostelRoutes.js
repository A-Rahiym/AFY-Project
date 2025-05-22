import express from 'express';
import { getHostels, bookAccommodation } from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostels);
hostelRouter.post('/book', bookAccommodation);
export default hostelRouter;