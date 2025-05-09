import express from "express";
import {
  createCourse,
  getInstructorCourses,
} from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createCourse);
router.route("/all").get(isAuthenticated, getInstructorCourses);

export default router;
