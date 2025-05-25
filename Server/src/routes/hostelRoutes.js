import express from 'express';
import { getHostelsController, bookAccommodation } from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostelsController);
hostelRouter.post('/book', bookAccommodation);
export default hostelRouter;