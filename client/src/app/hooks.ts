import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "@/types/slice";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
