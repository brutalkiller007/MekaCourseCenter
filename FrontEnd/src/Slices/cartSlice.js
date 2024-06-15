import { createSlice } from "@reduxjs/toolkit";

const initial_state = {
    total_items: localStorage.getItem("total_items") ? JSON.parse(localStorage.getItem("total_items")) : 0,
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initial_state,
    reducers:{
        set_total_items(state, value){
            state.total_items = value.payload;
        },
        set_cart(state, value){
            state.cart = value.payload;
        },
        set_total(state, value){
            state.total = value.payload;
        },
        set_cart_slice(state, value){
            state.cart = value.payload.cart;
            state.total = value.payload.total;
            state.total_items = value.payload.total_items;
        }
    }
});

export const {set_total_items, set_cart, set_total, set_cart_slice} = cartSlice.actions;
export default cartSlice.reducer;