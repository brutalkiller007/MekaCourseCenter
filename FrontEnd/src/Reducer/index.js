import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import profileReducer from "../Slices/profileSlice";
import cartReducer from "../Slices/cartSlice";
import courseReducer from "../Slices/courseSlice";
import view_courseReducer from "../Slices/ViewCourseSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
    course: courseReducer,
    view_course: view_courseReducer
})

export default rootReducer;