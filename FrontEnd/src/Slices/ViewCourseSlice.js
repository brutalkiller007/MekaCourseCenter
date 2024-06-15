import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    total_lectures: 0,
    completed_videos: [],
    course_details: {},
    course_section_details: []
};

const view_courseSlice = createSlice({
    name: "view_course",
    initialState: initial_state,
    reducers:{
        set_total_lectures(state, value){
            state.total_lectures = value.payload;
        },
        set_completed_videos(state, value){
            state.completed_videos = value.payload;
        },
        set_course_details(state, value){
            state.course_details = value.payload;
        },
        set_course_section_details(state, value){
            state.course_section_details = value.payload;
        },
        update_completed_videos(state, value){
            state.completed_videos = [...state.completed_videos, value.payload]
        }
    }
});

export const {set_total_lectures, set_completed_videos, set_course_details, set_course_section_details, update_completed_videos} = view_courseSlice.actions;
export default view_courseSlice.reducer;
