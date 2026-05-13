import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import { seedDemoUsers } from "./utils/seedDemoUsers.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Real Estate API Running Successfully 🚀",
    demoCredentials: {
      admin: {
        email: "admin@demo.com",
        password: "admin123",
      },
      user: {
        email: "user@demo.com",
        password: "user123",
      },
    },
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy ✅",
    time: new Date().toISOString(),
  });
});

// ================= API ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/contact", contactRoutes);

// ================= 404 ROUTE =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ================= GLOBAL ERROR HANDLER =================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await seedDemoUsers();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("✅ Demo Admin: admin@demo.com / admin123");
      console.log("✅ Demo User: user@demo.com / user123");
    });
  } catch (error) {
    console.error("❌ Server start failed:", error.message);
    process.exit(1);
  }
};

startServer();