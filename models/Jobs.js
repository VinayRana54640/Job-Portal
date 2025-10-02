import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    positionName: String,
    aboutRole: String,
    experience: String,
    responsibilities: [String],
    qualifications: [String],
    benefits: [String],
    technologies: [String],
    salaryRange: {
      min: String,
      max: String,
      minLpa: Number,
      maxLpa: Number,
    },
    website: String,
    location: String,
    company: String,
    postDate: Date,
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
