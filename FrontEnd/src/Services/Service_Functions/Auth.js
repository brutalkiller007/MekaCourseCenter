import toast from "react-hot-toast";
import { api_connector } from "../apiConnector";
import { auth } from "../apis";
import { set_loading, set_token} from "../../Slices/authSlice";
import { set_user_details } from "../../Slices/profileSlice";
import { set_cart, set_total, set_total_items } from "../../Slices/cartSlice";

export function log_in(body, navigate){
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("LOGGING IN....");
        try{
            
            const response = await api_connector("POST", auth.LOGIN, body);

            if(!response.data.success)
                throw new Error(response.data.message);
            
            console.log(response.data);
            dispatch(set_token(response.data.user.token));
            
            if(response.data.user.account_type === "Student"){
                dispatch(set_cart(response.data.user.cart.cart_courses));
                dispatch(set_total(response.data.user.cart.total_price));
                dispatch(set_total_items(response.data.user.cart.cart_courses?.length));

                localStorage.setItem("cart", JSON.stringify(response.data.user.cart.cart_courses));
                localStorage.setItem("total", JSON.stringify(response.data.user.cart.total_price));
                localStorage.setItem("total_items", JSON.stringify(response.data.user.cart.cart_courses?.length));
            }
            
            dispatch(set_user_details(response.data.user));

            localStorage.setItem("token", JSON.stringify(response.data.user.token));
            localStorage.setItem("user_details", JSON.stringify(response.data.user));
            
            toast.dismiss(toast_id);
            toast.success("LOGIN DONE SUCCESSFULLY");
            navigate("/dashboard/my_profile");
        }
        catch(error){
            toast.dismiss(toast_id);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function send_otp(email, navigate){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("SENDING OTP...");
        try{
            console.log(email);
            const response = await api_connector("POST", auth.SEND_OTP, {email});

            if(!response.data.success)
                throw new Error(response.data.message);

            toast.dismiss(toast_id);
            toast.success("OTP SENT TO MAIL SUCCESSFULLY");
            navigate("/verify_otp");
        }
        catch(error){
            console.log(error);
            toast.dismiss(toast_id);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function sign_up(first_name, last_name, email, password, confirm_password, contact_number, account_type, otp, navigate){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("CREATING ACCOUNT...");
        try{
        
            const response = await api_connector("POST", auth.SIGNUP, {first_name, last_name, email, password, confirm_password, contact_number, account_type, otp});

            if(!response.data.success)
                throw new Error(response.data.message);

            toast.dismiss(toast_id);
            toast.success("ACCOUNT CREATED SUCCESSFULLY");
            navigate("/login");
        }
        catch(error){
            console.log(error);
            toast.dismiss(toast_id);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function send_reset_password_token(email, set_mail_sent){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("SENDING RESET PASSWORD LINK TO YOUR MAIL...");

        try{

            const response = await api_connector("POST", auth.RESET_PASSWORD_TOKEN, {email});
            console.log(response);
            if(!response.data.success)
                throw new Error(response.data.message);

            set_mail_sent(true);
            toast.dismiss(toast_id);
            toast.success("RESET PASSWORD LINK SENT TO YOUR MAIL SUCCESSFULLY");
        }
        catch(error){
            console.log(error);
            toast.dismiss(toast_id);
            toast.error(error.response.data.message);
        }
        finally{
            dispatch(set_loading(false));
        }
    }
}

export function reset_password(password, confirm_password, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("UPDATING PASSWORD.......");

        try{

            const response = await api_connector("POST", auth.RESET_PASSWORD, {password, confirm_password, token});
            console.log(response);
            if(!response.data.success)
                throw new Error(response.data.message);

            toast.success("PASSWORD UPDATED SUCCESSFULLY");
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally{
            toast.dismiss(toast_id);
            dispatch(set_loading(false));
        }
    }
}



export function logout(navigate){
    return async(dispatch) => {
        dispatch(set_token(null));
        dispatch(set_user_details(null));

        localStorage.clear();

        toast.success("LOGGED OUT SUCCESSFULLY.....");
        navigate("/");
    }
}