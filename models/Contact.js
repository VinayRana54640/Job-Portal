import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    topic: { type: String },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
