import express from "express";

import {
  addProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
} from "../controllers/propertyController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

import { toggleFavorite } from "../controllers/authController.js";

const router = express.Router();

// SEARCH — keep before /:id
router.get("/search", searchProperties);

// GET ALL PROPERTIES
router.get("/", getProperties);

// ADD PROPERTY — admin only
router.post("/", protect, adminOnly, addProperty);

// FAVORITE — logged-in users
router.post("/favorite/:id", protect, toggleFavorite);

// GET SINGLE PROPERTY
router.get("/:id", getSingleProperty);

// UPDATE PROPERTY — admin only
router.put("/:id", protect, adminOnly, updateProperty);

// DELETE PROPERTY — admin only
router.delete("/:id", protect, adminOnly, deleteProperty);

export default router;