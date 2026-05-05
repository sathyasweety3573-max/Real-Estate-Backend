import express from "express";

import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ================= USER ROUTES =================

// ✅ Create booking
router.post("/:id", protect, createBooking);

// ✅ Get logged-in user bookings
router.get("/my", protect, getUserBookings);


// ================= ADMIN ROUTES =================

// ✅ Get all bookings (ADMIN ONLY)
router.get("/", protect, adminOnly, getAllBookings);

// ✅ Update booking status (ADMIN ONLY)
router.put("/:id", protect, adminOnly, updateBookingStatus);

// ✅ Delete booking (ADMIN ONLY)
router.delete("/:id", protect, adminOnly, deleteBooking);

export default router;