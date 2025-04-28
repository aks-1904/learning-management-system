import { User } from "./data";

export interface AuthState{
    user: User | null,
    isAuthenticated: boolean
}