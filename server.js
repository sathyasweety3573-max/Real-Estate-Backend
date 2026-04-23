import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();


const app = express();

// middleware
app.use(cors());
app.use(express.json());


// DB connect
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/booking", bookingRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running ");
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});