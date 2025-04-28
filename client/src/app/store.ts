import { authApi } from "@/features/api/authapi";
import rootReducer from "@/features/api/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware),
});
