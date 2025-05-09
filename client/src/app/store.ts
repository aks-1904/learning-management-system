import { authApi } from "@/features/api/authapi";
import { courseApi } from "@/features/api/courseapi";
import rootReducer from "@/features/api/rootReducer";
import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware, courseApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate(undefined, { forceRefetch: true })
  );
};
initializeApp();
