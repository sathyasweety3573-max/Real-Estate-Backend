import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedDemoUsers = async () => {
  try {
    console.log("🌱 Checking demo users...");

    const demoUsers = [
      {
        name: "Demo Admin",
        email: "admin@demo.com",
        password: "admin123",
        role: "admin",
        phone: "9876543210",
        location: "Chennai",
      },
      {
        name: "Demo User",
        email: "user@demo.com",
        password: "user123",
        role: "user",
        phone: "9876543211",
        location: "Coimbatore",
      },
    ];

    for (const demo of demoUsers) {
      // check existing user
      const existingUser = await User.findOne({
        email: demo.email,
      });

      if (existingUser) {
        console.log(
          `⚠️ ${demo.role} already exists`
        );
        continue;
      }

      // hash password
      const hashedPassword =
        await bcrypt.hash(
          demo.password,
          10
        );

      // create user
      await User.create({
        name: demo.name,
        email: demo.email,
        password: hashedPassword,
        role: demo.role,
        phone: demo.phone,
        location: demo.location,
      });

      console.log(
        `✅ ${demo.role.toUpperCase()} created successfully`
      );
    }

    console.log("🎉 Demo users setup completed");
  } catch (error) {
    console.log(
      "❌ Demo seed error:",
      error.message
    );
  }
};