import mongoose from "mongoose";
import { CourseSchema, CourseLevel } from "../types/schema.js";

const courseSchema = new mongoose.Schema<CourseSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: String,
    description: String,
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: CourseLevel,
    },
    price: Number,
    thumbnail: {
      type: String,
      default: "",
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
        default: [],
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
