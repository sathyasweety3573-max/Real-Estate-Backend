import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // 👤 USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🏡 PROPERTY
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    // 📅 BOOKING DATE
    bookingDate: {
      type: Date,
      default: Date.now,
    },

    // 👤 USER DETAILS
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // 📝 MESSAGE
    message: {
      type: String,
      default: "",
      trim: true,
    },

    // 📌 BOOKING STATUS
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "cancelled",
      ],
      default: "pending",
    },

    // 💰 PAYMENT
    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
      ],
      default: "pending",
    },

    // 🧑‍💼 ADMIN APPROVAL
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    adminMessage: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

// 🚫 prevent duplicate booking
bookingSchema.index(
  { user: 1, property: 1 },
  { unique: true }
);

const Booking =
  mongoose.model(
    "Booking",
    bookingSchema
  );

export default Booking;