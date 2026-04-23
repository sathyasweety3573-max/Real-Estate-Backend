import express from "express";
import { createProperty, getProperties, updateProperty, deleteProperty, searchProperties } from "../controllers/propertyController.js";
import { getSingleProperty } from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { toggleFavorite } from "../controllers/authController.js";
import { adminOnly } from "../middleware/roleMiddleware.js";
import { addProperty } from "../controllers/propertyController.js";

const router = express.Router();

//Add property
router.post("/", protect, adminOnly, addProperty);

// GET ALL
router.get("/", getProperties);

//GET SINGLE PROPERTY
router.get("/:id", getSingleProperty);

// SEARCH
router.get("/search", searchProperties);

// UPDATE
router.put("/:id", protect, authorizeRoles("agent"), updateProperty);

// DELETE
router.delete("/:id", protect, authorizeRoles("agent"), deleteProperty);

//Favorite
router.post("/favorite/:id", protect, toggleFavorite);

export default router;