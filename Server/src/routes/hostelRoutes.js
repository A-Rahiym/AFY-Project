import express from 'express';
import { getHostels } from '../controllers/hostelController.js';

const hostelRouter = express.Router();


hostelRouter.get('/:hostelName', getHostels);
export default hostelRouter;