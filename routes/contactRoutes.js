import express from "express";

import {
  sendMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/contactController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ================= PUBLIC =================

// Send message
router.post("/", sendMessage);

// ================= ADMIN =================

// Get all messages
router.get("/", protect, adminOnly, getMessages);

// Update message status
router.put("/:id", protect, adminOnly, updateMessageStatus);

// Delete message
router.delete("/:id", protect, adminOnly, deleteMessage);

export default router;