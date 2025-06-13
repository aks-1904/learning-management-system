import { CourseData } from "@/types/data";
import { CreateCourse } from "@/types/form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = `${import.meta.env.VITE_BACKEND_URL}/course/`;

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch-Instructor-Courses", "Refetch_Lecture"],
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
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({ title, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { title, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (id) => ({
        url: `/lecture/${id}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ id, query }: any) => ({
        url: `/${id}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    getPublishedCourses: builder.query<any, void>({
      query: () => ({
        url: "/",
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
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetPublishedCoursesQuery,
} = courseApi;
