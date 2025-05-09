import { Request, Response } from "express";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { UserRole } from "../types/schema.js";

export const createCourse = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      // returning if required variables not passes
      return res.status(400).json({
        success: false,
        message: "Course title and category required",
      });
    }

    const user = await User.findById(req.id); // finding authenticated user

    if (user && user.role !== UserRole.Instructor) {
      // user should be instructor
      return res.status(401).json({
        success: false,
        message: "You are not authorized to create course",
      });
    }

    const course = await Course.create({
      // creating course
      title,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: "Course created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Couldn't create course, try again later",
    });
  }
};

export const getInstructorCourses = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });

    if (!courses) {
      return res.status(404).json({
        success: false,
        courses: [],
        message: "Courses not found",
      });
    }

    return res.status(200).json({
      courses,
      message: "",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      courses: [],
      message: "Not able to get your courses, try again later",
    });
  }
};
