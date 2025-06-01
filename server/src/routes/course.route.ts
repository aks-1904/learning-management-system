import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  getCourseById,
  getInstructorCourses,
  getLectures,
} from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createCourse);
router.route("/all").get(isAuthenticated, getInstructorCourses);
router
  .route("/:id")
  .put(isAuthenticated, upload.single("thumbnail"), editCourse);
router.route("/:id").get(isAuthenticated, getCourseById);
router.route("/:id/lecture").post(isAuthenticated, createLecture);
router.route("/:id/lecture").get(isAuthenticated, getLectures);

export default router;
