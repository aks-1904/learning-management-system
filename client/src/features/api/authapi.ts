import { LoginForm, RegisterForm } from "@/types/form";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { profileData } from "@/types/data";

const USER_API = `${import.meta.env.VITE_BACKEND_URL}/user/`;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data: RegisterForm) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data: LoginForm) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query<profileData, void>({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateUser: builder.mutation({
      query: (data: FormData) => ({
        url: "profile/update",
        method: "PUT",
        body: data,
      }),
    }),
    logoutUser: builder.mutation<any, void>({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation,
  useLogoutUserMutation,
} = authApi;
