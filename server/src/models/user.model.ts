import mongoose from "mongoose";
import { UserRole, UserSchema } from "../types/schema.js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Regex to valid email
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.Student,
    },
    enrolledCourses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      default: [], // Default empty array
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
