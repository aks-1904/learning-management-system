import { appStore } from "@/app/store";
import { User } from "./data";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
