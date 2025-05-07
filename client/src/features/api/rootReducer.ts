import authReducer from "@/features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authapi";
import { courseApi } from "./courseapi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [courseApi.reducerPath]: courseApi.reducer,
});

export default rootReducer;
