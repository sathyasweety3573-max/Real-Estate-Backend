import express from "express";

import {
  addProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
  getFeaturedProperties,
  getTrendingProperties,
} from "../controllers/propertyController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ================= PUBLIC ROUTES =================

// 🔍 SEARCH (keep before /:id)
router.get("/search", searchProperties);

// ⭐ FEATURED
router.get("/featured", getFeaturedProperties);

// 🔥 TRENDING
router.get("/trending", getTrendingProperties);

// 🏡 GET ALL
router.get("/", getProperties);

// 📄 GET SINGLE
router.get("/:id", getSingleProperty);


// ================= ADMIN ROUTES =================

// ➕ ADD PROPERTY
router.post("/", protect, adminOnly, addProperty);

// ✏️ UPDATE
router.put("/:id", protect, adminOnly, updateProperty);

// ❌ DELETE
router.delete("/:id", protect, adminOnly, deleteProperty);

export default router;