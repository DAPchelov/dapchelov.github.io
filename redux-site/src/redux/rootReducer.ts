import { combineReducers } from "redux";
import { likesReducer } from "./likesReducer";
import { inputReducer } from "./inputReducer";

const rootReducer = combineReducers ({
    likesReducer: likesReducer,
    inputReducer: inputReducer
})

export {rootReducer}