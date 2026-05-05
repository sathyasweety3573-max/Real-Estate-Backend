import express from "express";

import {
  getDashboardStats,
  getUsers,
  deleteUser,
  deleteAnyProperty,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ================= ADMIN DASHBOARD =================

router.get("/stats", protect, adminOnly, getDashboardStats);

// ================= USERS =================

router.get("/users", protect, adminOnly, getUsers);

router.delete("/user/:id", protect, adminOnly, deleteUser);

// ================= PROPERTIES =================

router.delete("/property/:id", protect, adminOnly, deleteAnyProperty);

export default router;