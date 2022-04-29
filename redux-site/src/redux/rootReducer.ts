import { combineReducers } from "redux";
import { likesReducer } from "./likesReducer";

const rootReducer = combineReducers ({
    likesReducer: likesReducer
})

export {rootReducer}