import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  toggleFavorite,
  getFavorites,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= AUTH =================

router.post("/register", registerUser);
router.post("/login", loginUser);

// ================= PROFILE =================

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// ================= FORGOT PASSWORD =================

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ================= FAVORITES =================

router.post("/favorite/:id", protect, toggleFavorite);
router.get("/favorites", protect, getFavorites);

export default router;