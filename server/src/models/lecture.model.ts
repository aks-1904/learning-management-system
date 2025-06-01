import mongoose from "mongoose";
import { LectureSchema } from "../types/schema.js";

const lectureSchema = new mongoose.Schema<LectureSchema>({
  title: {
    type: String,
    required: true,
  },
  videoUrl: String,
  publicId: String,
  isPreviewFree: Boolean,
});

export const Lecture = mongoose.model("Lecture", lectureSchema);
