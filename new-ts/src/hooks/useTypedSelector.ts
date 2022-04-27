import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers/combineReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;