import express from "express";
import {
  createCourse,
  editCourse,
  getInstructorCourses,
} from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createCourse);
router.route("/all").get(isAuthenticated, getInstructorCourses);
router.route("/:id").put(isAuthenticated, upload.single("thumbnail"), editCourse);

export default router;
