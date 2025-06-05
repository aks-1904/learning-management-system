import express from "express";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getInstructorCourses,
  getLectureById,
  getLectures,
  removeLecture,
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
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:id").delete(isAuthenticated, removeLecture);
router.route("/lecture/:id").get(isAuthenticated, getLectureById);

export default router;
