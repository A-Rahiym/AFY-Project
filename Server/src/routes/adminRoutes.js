import express from "express";

import {
  assignRoomToStudentController,
  assignRoomToStudentsBatchController,
  getRequestedStudents,
  fetchHostelOccupancy,
  fetchPaymentStatus,
} from "../controllers/adminController.js";

import { adminLogin, adminRegister } from "../controllers/authController.js";


const adminRouter = express.Router();
adminRouter.post("/login", adminLogin);
/**
 * @route POST /api/auth/admin/register
 * @description Public endpoint for registering new admin users.
 * (Consider protecting this in production, e.g., only allowing existing admins to create new ones).
 * @access Public (for initial setup)
 */
adminRouter.post("/register", adminRegister);
adminRouter.get("/summary/payment", fetchPaymentStatus);
adminRouter.get("/summary/hostel", fetchHostelOccupancy);

adminRouter.get(
  "/students/requested",
  // --- Security Layer (Highly Recommended) ---
  // If you have JWT authentication:
  // authenticateToken, // Verifies the user is logged in and has a valid token

  // If you have role-based authorization:
  // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route

  // --- Controller Call ---
  getRequestedStudents // Calls the function that handles the assignment logic
);

adminRouter.post(
  "/assign-room-by-choices",
  // --- Security Layer (Highly Recommended) ---
  // If you have JWT authentication:
  // authenticateToken, // Verifies the user is logged in and has a valid token
  // If you have role-based authorization:
  // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route
  // --- Controller Call ---
  assignRoomToStudentController // Calls the function that handles the assignment logic
);

adminRouter.post(
  "/batch-assign-room",
  // --- Security Layer (Highly Recommended) ---
  // If you have JWT authentication:
  // authenticateToken, // Verifies the user is logged in and has a valid token
  // If you have role-based authorization:
  // authorizeRoles(['admin']), // Ensures only users with 'admin' role can access this route
  // --- Controller Call ---
  assignRoomToStudentsBatchController // Calls the function that handles the assignment logic
);
export default adminRouter;
