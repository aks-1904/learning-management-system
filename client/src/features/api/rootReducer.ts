import authReducer from "@/features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./authapi";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

export default rootReducer;
