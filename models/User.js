import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    password: { type: String },
    otp: { type: String },
    location: { type: String },
    role: { type: String },
    experienceYears: { type: String },
    skills: { type: Array },
    portfolio: { type: String },
    bio: { type: String },
    resumeLink: { type: String },
    fileName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
