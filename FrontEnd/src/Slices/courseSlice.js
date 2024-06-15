import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    step: 1,
    course_details: null,
    edit_course: false,
    payment_loading: false
};

const courseSlice = createSlice({
    name: "course",
    initialState: initial_state,
    reducers:{
        set_step(state, value){
            state.step = value.payload;
        },
        set_course_details(state, value){
            state.course_details = value.payload;
        },
        set_edit_course(state, value){
            state.edit_course = value.payload;
        },
        set_payment_loading(state, value){
            state.payment_loading = value.payload;
        }
    }
});

export const {set_step, set_course_details, set_edit_course, set_payment_loading} = courseSlice.actions;
export default courseSlice.reducer;
