import mongoose, { Document } from "mongoose";

export enum UserRole {
  Instructor = "instructor",
  Student = "student",
}

export enum CourseLevel {
  Beginner = "beginner",
  Medium = "medium",
  Advance = "advance",
}

export interface UserSchema extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  enrolledCourses: mongoose.Schema.Types.ObjectId[]; // Reference to Course
  profilePicture: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSchema extends Document {
  title: string;
  subTitle: string;
  description: string;
  category: string;
  level: CourseLevel;
  price: number;
  thumbnail: string;
  enrolledStudents: mongoose.Schema.Types.ObjectId[]; // Reference to User
  lectures: mongoose.Schema.Types.ObjectId[]; // Reference to Lecture
  creator: mongoose.Schema.Types.ObjectId; // Reference to User
  isPublished: boolean;
}
