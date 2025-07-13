// routes/studentRoutes.js
import express from "express";
import {
  submitHostelChoices,
  getProfile,
  updatePaymentStatus,
  handleAccommodationSelection,
} from "../controllers/studentController.js";



import {
  registerStudent,
  loginStudent,
} from "../controllers/authController.js";



import { accommodationAuthMiddleware } from "../middleware/accommodationAuthMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import studentProfileMiddleware from "../middleware/studentProfileMiddleware.js";

const studentRouter = express.Router();
// Register a new student
studentRouter.post("/register", registerStudent);
// Get a student by registration number
studentRouter.post("/login", loginStudent);
// Assign token to student
studentRouter.put(
  "/payment-status/:student_id",
  authMiddleware,
  updatePaymentStatus
);
// router.put('/:reg_number', assignToken);
studentRouter.post(
  "/select-accommodation",
  accommodationAuthMiddleware,
  handleAccommodationSelection
);
// Get student profile
studentRouter.get("/profile", studentProfileMiddleware, getProfile);

studentRouter.post("/:studentId/submit-choices", submitHostelChoices);
export default studentRouter;
