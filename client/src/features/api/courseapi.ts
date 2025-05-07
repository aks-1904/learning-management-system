import { CreateCourse } from "@/types/form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = `${import.meta.env.VITE_BACKEND_URL}/course/`;

export const courseApi = createApi({
  reducerPath: "courseApi",
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
    }),
  }),
});

export const { useCreateCourseMutation } = courseApi;
