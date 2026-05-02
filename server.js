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

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ================= DATABASE =================

connectDB();

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("Real Estate API Running Successfully 🚀");
});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/booking", bookingRoutes);

// ================= 404 ROUTE =================

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});