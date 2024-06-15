import toast from "react-hot-toast";
import { api_connector } from "../apiConnector";
import { course, section, sub_section} from "../apis";
import { set_loading } from "../../Slices/authSlice";
import { set_course_details, set_step, set_edit_course } from "../../Slices/courseSlice";

export function create_course(form_data, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("CREATING A COURSE...");
        try{
            
            const response = await api_connector("POST",  course.CREATE_COURSE, form_data, {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);
            console.log("xxx", response.data.course);
            dispatch(set_course_details(response.data.course));
            dispatch(set_step(2));
            
            toast.dismiss(toast_id);
            toast.success("COURSE CREATED SUCCESSFULLY");
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

export function update_course_details(form_data, token, course_details, flag){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("EDITING THE COURSE...");
        try{
            
            const response = await api_connector("POST",  course.EDIT_COURSE, form_data, {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);
            
            const updated_course = response.data.updated_course;
            console.log(updated_course);
            dispatch(set_course_details({...updated_course, 
                                        instructor: course_details.instructor, 
                                        course_content: course_details.course_content,
                                        rating_and_reviews: course_details.rating_and_reviews,
                                        students_enrolled: course_details.students_enrolled
                                    }));
            
            if(flag){
                dispatch(set_edit_course(false));
                dispatch(set_step(2));
            }
            
            toast.dismiss(toast_id);
            toast.success("COURSE EDITED SUCCESSFULLY");
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

export function create_section(section_name, course_id, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("CREATING A SECTION...");
        try{
            
            const response = await api_connector("POST", section.CREATE_SECTION,{section_name:section_name, course_id: course_id, token: token }, 
                                                {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            dispatch(set_course_details(response.data.updated_course));
            
            toast.dismiss(toast_id);
            toast.success("SECTION CREATED SUCCESSFULLY");
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

export function update_section(section_name, section_id, course_id, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("EDITING THE SECTION...");
        try{
            
            const response = await api_connector("POST", section.UPDATE_SECTION ,{section_name:section_name, section_id: section_id, course_id: course_id, token: token }, 
                                                {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            dispatch(set_course_details(response.data.updated_course));
            
            toast.dismiss(toast_id);
            toast.success("SECTION EDITED SUCCESSFULLY");
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

export function delete_section(section_id, course_id, token){
    
    return async(dispatch) => {
        dispatch(set_loading(true));
        const toast_id = toast.loading("DELETING THE SECTION...");

        try{
            
            const response = await api_connector("DELETE", section.DELETE_SECTION ,{section_id: section_id, course_id: course_id, token: token });

            if(!response.data.success)
                throw new Error(response.data.message);

            dispatch(set_course_details(response.data.updated_course));
            
            toast.dismiss(toast_id);
            toast.success("SECTION DELETED SUCCESSFULLY");
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



export function create_sub_section(form_data, token, course_details){
    return async(dispatch) => {
    
        dispatch(set_loading(true));
        const toast_id = toast.loading("CREATING A SUB-SECTION...");
        try{
            
            const response = await api_connector("POST", sub_section.CREATE_SUB_SECTION, form_data, 
                                                {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            const updated_section = response.data.updated_section;

            const updated_course_content = course_details?.course_content?.map((item) => 
                item._id === updated_section._id ? updated_section : item
            )

            const updated_course = {...course_details, course_content : updated_course_content};

            dispatch(set_course_details(updated_course));

            toast.dismiss(toast_id);
            toast.success("SUB-SECTION CREATED SUCCESSFULLY");
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

export function update_sub_section(form_data, token, course_details, section_id){
    return async(dispatch) => {
    
        dispatch(set_loading(true));
        const toast_id = toast.loading("UPDATING A SUB-SECTION...");
        try{
            
            const response = await api_connector("POST", sub_section.UPDATE_SUB_SECTION, form_data, 
                                                {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`});

            if(!response.data.success)
                throw new Error(response.data.message);

            const updated_subsection = response.data.updated_subsection;

            console.log("fuck you", updated_subsection, section_id);
            const updated_course_content = course_details?.course_content?.map((item) => 
                item._id === section_id ? {
                    ...item, sub_section: (item?.sub_section?.map((sub_section) => 
                    sub_section._id === updated_subsection._id ? updated_subsection : sub_section))
                }
                    : item
            )

            const updated_course = {...course_details, course_content : updated_course_content};
            dispatch(set_course_details(updated_course));

            toast.dismiss(toast_id);
            toast.success("SUB-SECTION CREATED SUCCESSFULLY");
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

export function delete_sub_section(sub_section_id, section_id, token, course_details){
    return async(dispatch) => {
    
        dispatch(set_loading(true));
        const toast_id = toast.loading("DELETING A SUB-SECTION...");
        try{
            
            const response = await api_connector("DELETE", sub_section.DELETE_SUB_SECTION, {sub_section_id: sub_section_id, section_id: section_id, token: token});

            if(!response.data.success)
                throw new Error(response.data.message);

            const updated_section = response.data.updated_section;

            const updated_course_content = course_details?.course_content?.map((item) => 
                item._id === updated_section._id ? updated_section : item
            )

            const updated_course = {...course_details, course_content : updated_course_content};
            dispatch(set_course_details(updated_course));

            toast.dismiss(toast_id);
            toast.success("SUB-SECTION DELETED SUCCESSFULLY");
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

