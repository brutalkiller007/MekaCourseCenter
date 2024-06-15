import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false,
    signup_data: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initial_state,
    reducers:{
        set_token(state, value){
            state.token = value.payload;
        },
        set_loading(state, value){
            state.loading = value.payload;
        },
        set_signup_data(state, value){
            state.signup_data = value.payload;
        }
    }
});

export const {set_token, set_loading, set_signup_data} = authSlice.actions;
export default authSlice.reducer;
