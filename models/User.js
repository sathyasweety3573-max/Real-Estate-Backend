import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    // ✅ USER ROLE
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    // ❤️ FAVORITES
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],

    // 🔍 SAVED SEARCHES
    savedSearches: [
      {
        location: String,

        propertyType: String,

        minPrice: Number,

        maxPrice: Number,

        purpose: {
          type: String,
          enum: ["sale", "rent"],
        },
      },
    ],

    // 🔐 FORGOT PASSWORD
    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

const User =
  mongoose.model("User", userSchema);

export default User;