import express from "express";
import { createAgentProfile, getAgentProfile } from "../controllers/agentController.js";

const router = express.Router();

router.post("/", createAgentProfile);
router.get("/:id", getAgentProfile);

export default router;