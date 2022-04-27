import { combineReducers } from "redux";
import { postReducer } from "./postReducer"

export const rootReducer = combineReducers( {
    post: postReducer,
})

export type RootState = ReturnType<typeof rootReducer>;