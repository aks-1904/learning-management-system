import { CourseData } from "@/types/data";
import { CreateCourse } from "@/types/form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = `${import.meta.env.VITE_BACKEND_URL}/course/`;

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-Instructor-Courses"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data: CreateCourse) => ({
        url: "create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Refetch-Instructor-Courses"],
    }),
    getInstructorCourses: builder.query<CourseData, void>({
      query: () => ({
        url: "all",
        method: "GET",
      }),
      providesTags: ["Refetch-Instructor-Courses"],
    }),
  }),
});

export const { useCreateCourseMutation, useGetInstructorCoursesQuery } =
  courseApi;
