import toast from "react-hot-toast";
import { api_connector } from "../apiConnector";
import { profile, auth } from "../apis";
import { set_user_details, set_loading } from "../../Slices/profileSlice";
import { set_token } from "../../Slices/authSlice";

export function update_dp(form_data, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("UPDATING DISPLAY PICTURE...");
        try{
            
            const response = await api_connector("PUT", profile.UPDATE_DP, form_data, {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            dispatch(set_user_details(response.data.user_details));
            localStorage.setItem("user_details", JSON.stringify(response.data.user_details));

            toast.dismiss(toast_id);
            toast.success("DISPLAY PICTURE UPDATED SUCCESSFULLY");
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

export function update_info({first_name, last_name, gender, about, contact_number, date_of_birth}, token, navigate){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("UPDATING PERSONAL INFORMATION...");
        try{

            const response = await api_connector("PUT", profile.UPDATE_INFO, {first_name, last_name, gender, about, contact_number, date_of_birth, token}, {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            dispatch(set_user_details(response.data.updated_user));
            localStorage.setItem("user_details", JSON.stringify(response.data.updated_user));

            toast.dismiss(toast_id);
            toast.success("PERSONAL INFO UPDATED SUCCESFULLY");
            console.log(response.data);
            
            navigate("/dashboard/my_profile");
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

export function change_password({new_password, old_password}, token){
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("CHANGING PASSWORD...");
        try{
            
            const response = await api_connector("POST", auth.CHANGE_PASSWORD, {new_password, old_password, token});

            if(!response.data.success)
                throw new Error(response.data.message);

            toast.dismiss(toast_id);
            toast.success("PASSWORD CHANGED SUCCESSFULLY");
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

export function delete_account(token, navigate){
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("DELETING YOUR ACCOUNT...");
        try{
            
            const response = await api_connector("DELETE", profile.DELETE_ACCOUNT, {token});

            if(!response.data.success)
                throw new Error(response.data.message);

            localStorage.clear();
            set_user_details(null);
            set_token(null);
            
            navigate("/");

            toast.dismiss(toast_id);
            toast.success("ACCOUNT DELETED SUCCESSFULLY");
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