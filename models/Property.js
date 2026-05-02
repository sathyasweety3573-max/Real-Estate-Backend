import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Apartment", "Villa", "Penthouse", "Farm House"],
      default: "Apartment",
    },

    bedrooms: {
      type: Number,
      default: 3,
    },

    bathrooms: {
      type: Number,
      default: 2,
    },

    area: {
      type: Number,
      default: 1200,
    },

    images: {
      type: [String],
      default: [],
    },

    // ✅ who added property (admin)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);