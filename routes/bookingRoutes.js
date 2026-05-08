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

// ======================================================
// USER ROUTES
// ======================================================

// ✅ CREATE BOOKING
router.post(
  "/:id",
  protect,
  createBooking
);

// ✅ GET LOGGED-IN USER BOOKINGS
router.get(
  "/my",
  protect,
  getUserBookings
);

// ======================================================
// ADMIN ROUTES
// ======================================================

// ✅ GET ALL BOOKINGS
router.get(
  "/",
  protect,
  adminOnly,
  getAllBookings
);

// ✅ APPROVE / REJECT / UPDATE BOOKING
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateBookingStatus
);

// ✅ DELETE BOOKING
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteBooking
);

export default router;