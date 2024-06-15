import toast from "react-hot-toast";
import { api_connector } from "../apiConnector";
import { cart } from "../apis";
import { set_cart_slice } from "../../Slices/cartSlice";
import { set_loading} from "../../Slices/profileSlice";

export function add_course_to_cart(cart_id, course_id , total, token){

    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("ADDING TO CART....");
        try{

            const response = await api_connector("POST", cart.ADD_TO_CART , {cart_id: cart_id, course_id: course_id, updated_total : total}, {Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message)

            const cart_slice = {
                cart: response.data.new_cart.cart_courses,
                total: response.data.new_cart.total_price,
                total_items: response.data.new_cart.cart_courses?.length
            }

            dispatch(set_cart_slice(cart_slice));

            localStorage.setItem("cart", JSON.stringify(response.data.new_cart.cart_courses));
            localStorage.setItem("total", JSON.stringify(response.data.new_cart.total_price));
            localStorage.setItem("total_items", JSON.stringify(response.data.new_cart.cart_courses?.length));
            
            toast.dismiss(toast_id);
            toast.success("COURSE ADDED TO THE CART SUCCESSFULLY");
        }
        catch(error){
            toast.dismiss(toast_id);
            toast.error(error.response.data.message || error.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function remove_course_from_cart(cart_id, course_id, total, token){

    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("REMOVING FROM CART....");
        try{

            const response = await api_connector("POST", cart.REMOVE_FROM_CART , {cart_id: cart_id, course_id: course_id, updated_total : total}, {Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message)

            const cart_slice = {
                cart: response.data.new_cart.cart_courses,
                total: response.data.new_cart.total_price,
                total_items: response.data.new_cart.cart_courses?.length
            }

            dispatch(set_cart_slice(cart_slice));

            localStorage.setItem("cart", JSON.stringify(response.data.new_cart.cart_courses));
            localStorage.setItem("total", JSON.stringify(response.data.new_cart.total_price));
            localStorage.setItem("total_items", JSON.stringify(response.data.new_cart.cart_courses?.length));
            
            toast.dismiss(toast_id);
            toast.success("COURSE REMOVED FROM THE CART SUCCESSFULLY");
        }
        catch(error){
            toast.dismiss(toast_id);
            toast.error(error.response.data.message || error.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function clear_cart(cart_id, token){

    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("CLEARING THE CART....");
        try{

            const response = await api_connector("POST", cart.CLEAR_CART , {cart_id: cart_id}, {Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message)

            const cart_slice = {
                cart: response.data.new_cart.cart_courses,
                total: response.data.new_cart.total_price,
                total_items: response.data.new_cart.cart_courses?.length
            }

            dispatch(set_cart_slice(cart_slice));

            localStorage.setItem("cart", JSON.stringify(response.data.new_cart.cart_courses));
            localStorage.setItem("total", JSON.stringify(response.data.new_cart.total_price));
            localStorage.setItem("total_items", JSON.stringify(response.data.new_cart.cart_courses?.length));
            
            toast.dismiss(toast_id);
            toast.success("CART CLEARED SUCCESFULLY");
        }
        catch(error){
            toast.dismiss(toast_id);
            toast.error(error.response.data.message || error.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export async function get_cart_courses(cart_id, token){
    const toast_id = toast.loading("LOADING.....")
    let result;
    try{
        const response = await api_connector("POST", cart.GET_CART_COURSES, {cart_id: cart_id}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE FETCHING CART COURSES");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}