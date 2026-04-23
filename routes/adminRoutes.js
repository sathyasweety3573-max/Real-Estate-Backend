import express from "express";
import { getUsers, deleteUser, deleteAnyProperty } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/users", protect, authorizeRoles("admin"), getUsers);
router.delete("/user/:id", protect, authorizeRoles("admin"), deleteUser);
router.delete("/property/:id", protect, authorizeRoles("admin"), deleteAnyProperty);

export default router;