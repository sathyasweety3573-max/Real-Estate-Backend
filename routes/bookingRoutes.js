import express from "express";

import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= USER ROUTES =================

// ✅ Create booking
router.post("/:id", protect, createBooking);

// ✅ Get logged-in user bookings
router.get("/my", protect, getUserBookings);


// ================= ADMIN ROUTES =================

// ✅ Get all bookings (admin)
router.get("/", protect, getAllBookings);

// ✅ Update booking status (admin)
router.put("/:id", protect, updateBookingStatus);

export default router;