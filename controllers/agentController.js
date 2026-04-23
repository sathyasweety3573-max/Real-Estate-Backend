import Agent from "../models/Agent.js";

// CREATE PROFILE
export const createAgentProfile = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROFILE
export const getAgentProfile = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).populate("properties");
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};