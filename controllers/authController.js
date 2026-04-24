import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// REGISTER
export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    // CHECK USER ALREADY EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({
      message: "User Registered"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found " });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: "Wrong password ❌" });

 const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // check already exists
    const exists = user.favorites.includes(req.params.id);

    if (exists) {
      user.favorites.pull(req.params.id);
    } else {
      user.favorites.push(req.params.id);
    }

    await user.save();

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};