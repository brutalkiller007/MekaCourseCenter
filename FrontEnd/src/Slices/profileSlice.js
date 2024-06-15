import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    user_details: localStorage.getItem("user_details") ? JSON.parse(localStorage.getItem("user_details")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initial_state,
    reducers:{
        set_user_details(state, value){
            state.user_details = value.payload;
        },
        set_loading(state, value){
            state.loading = value.payload;
        },
    }
});

export const {set_user_details, set_loading} = profileSlice.actions;
export default profileSlice.reducer;