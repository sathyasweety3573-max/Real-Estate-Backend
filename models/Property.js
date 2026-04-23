import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
   title: String,
  price: Number,
  location: String,
  description: String,

  images: {
    type: [String],   // array of image URLs
    default: []
  },

  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);