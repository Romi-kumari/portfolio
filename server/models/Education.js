import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String, default: '' },
  grade: { type: String, default: '' },
}, { timestamps: true });

const Education =
  mongoose.models.Education ||
  mongoose.model("Education", educationSchema);

export default Education;