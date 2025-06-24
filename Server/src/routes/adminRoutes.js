import express from 'express';

import { assignRoomToStudentController ,
       assignRoomToStudentsBatchController,
       getRequestedStudents} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get(
    '/students/requested',
    // --- Security Layer (Highly Recommended) ---
    // If you have JWT authentication:
    // authenticateToken, // Verifies the user is logged in and has a valid token

    // If you have role-based authorization:
    // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route

    // --- Controller Call ---
    getRequestedStudents // Calls the function that handles the assignment logic
);

adminRouter.post(
    '/assign-room-by-choices',
    // --- Security Layer (Highly Recommended) ---
    // If you have JWT authentication:
    // authenticateToken, // Verifies the user is logged in and has a valid token

    // If you have role-based authorization:
    // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route

    // --- Controller Call ---
    assignRoomToStudentController // Calls the function that handles the assignment logic
);

adminRouter.post(
    '/batch-assign-room',
    // --- Security Layer (Highly Recommended) ---
    // If you have JWT authentication:
    // authenticateToken, // Verifies the user is logged in and has a valid token
    // If you have role-based authorization:
    // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route
    // --- Controller Call ---
     assignRoomToStudentsBatchController // Calls the function that handles the assignment logic
);
export default adminRouter;