import User from "../models/User.js";
import Property from "../models/Property.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// DELETE USER
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// DELETE PROPERTY (admin)
export const deleteAnyProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ message: "Property deleted by admin" });
};