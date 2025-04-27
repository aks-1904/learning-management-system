import mongoose, { Document } from "mongoose";

export enum UserRole {
  Instructor = "instructor",
  Student = "student",
}

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  enrolledCourses: mongoose.Schema.Types.ObjectId[]; // Reference to Course
  profilePicture: string;
}
