import { Request, Response } from "express";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { CourseLevel, UserRole } from "../types/schema.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";
import mongoose from "mongoose";

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

export const editCourse = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, description, category, level, price } = req.body;
    let { subTitle } = req.body;
    const thumbnail = req.file;

    if (subTitle === "undefined") subTitle = null;

    if (
      !(
        level.toLowerCase() === CourseLevel.Beginner ||
        level.toLowerCase() === CourseLevel.Medium ||
        level.toLowerCase() === CourseLevel.Advance
      )
    ) {
      return res.status(404).json({
        message: "Course Level is required",
        success: false,
      });
    }

    let course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    let courseThumbnail;

    if (thumbnail) {
      if (course.thumbnail) {
        const publicId = course.thumbnail?.split("/")?.pop()!.split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }

      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updatedData = {
      title,
      subTitle,
      description,
      category,
      level: level.toLowerCase(),
      price,
      thumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(id, updatedData, { new: true });

    await course!.save();

    return res.status(200).json({
      course,
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to edit course",
    });
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get course data",
      success: false,
    });
  }
};

export const createLecture = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    if (!id) {
      return;
    }

    if (!title) {
      return res.status(404).json({
        message: "Lecture Title required",
        success: false,
      });
    }

    if (!id) {
      return res.status(404).json({
        message: "Some error occured, try again later",
        success: false,
      });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    const lecture = await Lecture.create({ title });
    course.lectures.push(lecture._id as mongoose.Schema.Types.ObjectId);
    course.save();

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create lecture",
      success: false,
    });
  }
};

export const getLectures = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate("lectures");
    if (!course) {
      return res.status(404).json({
        messgae: "Course not found",
        success: false,
      });
    }

    return res.status(200).json({
      lectures: course.lectures,
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get lectures",
      success: false,
    });
  }
};

export const editLecture = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    if (title) lecture.title = title;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (
      course &&
      !course.lectures.includes(lecture._id as mongoose.Schema.Types.ObjectId)
    ) {
      course.lectures.push(lecture._id as mongoose.Schema.Types.ObjectId);
      await lecture.save();
    }

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update lecture",
      success: false,
    });
  }
};

export const removeLecture = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findByIdAndDelete(id);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
        success: false,
      });
    }

    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    await Course.updateOne(
      {
        lectures: id,
      },
      { $pull: { lectures: id } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to remove lecture",
      success: false,
    });
  }
};

export const getLectureById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById(id);

    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
        success: false,
      });
    }

    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to load lecture data",
      success: false,
    });
  }
};

export const togglePublishCourse = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    if (course.lectures.length === 0) {
      return res.status(401).json({
        message:
          "You can't publish this course, because you don't have any lectures",
        success: false,
      });
    }

    course.isPublished = publish === "true";
    await course.save();

    const resMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message: `Course is ${resMessage}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update status",
      success: false,
    });
  }
};
