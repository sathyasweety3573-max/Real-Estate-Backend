import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  bio: String,
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
  }]
});

export default mongoose.model("Agent", agentSchema);