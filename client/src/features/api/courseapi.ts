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
    editCourse: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch-Instructor-Courses"],
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ title, id }) => ({
        url: `/${id}/lecture`,
        method: "POST",
        body: { title },
      }),
    }),
    getCourseLecture: builder.query({
      query: (id) => ({
        url: `/${id}/lecture`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetInstructorCoursesQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} = courseApi;
