import express from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// ================= AUTH =================

router.post("/register", registerUser);
router.post("/login", loginUser);

// ================= FORGOT PASSWORD =================

// Step 1 → email send
router.post("/forgot-password", forgotPassword);

// Step 2 → reset password using token
router.post("/reset-password/:token", resetPassword);

export default router;