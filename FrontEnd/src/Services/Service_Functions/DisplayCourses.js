import { categories, course, course_progress, rating_and_reviews} from "../apis";
import { api_connector } from "../apiConnector";
import toast from "react-hot-toast";

export async function get_instructor_courses( token){
    
    let result;
    try{
        const response = await api_connector("GET", course.GET_INSTRUCTOR_COURSES, {}, {Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response.data.all_courses;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
        return result;
    }
}

export async function delete_course( course_id ,token){
    
    try{
        const response = await api_connector("DELETE", course.DELETE_COURSE, {course_id : course_id}, {Authorization: `Bearer ${token}`} );

        if(!response.data.success)
            throw new Error(response.data.message);
    
        return true;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
        return false;
    }
    
}

export async function get_course_details(course_id){
    
    let result;
    try{
        const response = await api_connector("POST", course.GET_COURSE_DETAILS, {course_id : course_id});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response.data.course_details;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
    }
    finally{
        return result;
    }
    
}

export async function get_enrolled_courses(token){
    
    let result;
    try{
        const response = await api_connector("GET", course.GET_ENROLLED_COURSES, {}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
        result = error.response?.data;
    }
    finally{
        return result;
    }
    
}

export async function get_page(category_id){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{
        const response = await api_connector("POST", categories.GET_PAGE, {category_id : category_id});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message);
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function get_view_course_details(course_id, token){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{
        const response = await api_connector("POST", course.GET_VIEW_COURSE_DETAILS, {course_id : course_id}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE FETCHING DETAILS");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function update_course_progress(course_id, sub_section_id, token){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{
        const response = await api_connector("POST", course_progress.UPDATE_COURSE_PROGRESS, {course_id : course_id, sub_section_id: sub_section_id}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE UPDATING COURSE PROGRESS");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function add_rating_and_review(course_id, rating, review, token){

    const toast_id = toast.loading("ADDING THE REVIEW.....")
    let result;
    try{
        const response = await api_connector("POST", rating_and_reviews.ADD_RATING_AND_REVIEW, {course_id : course_id, rating: rating, review: review}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE ADDING THE REVIEW");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

export async function get_instructor_dashboard_details(token){

    const toast_id = toast.loading("LOADING.....")
    let result;
    try{
        const response = await api_connector("GET", course.GET_INSTRUCTOR_DASHBOARD_DETAILS, {}, {Authorization: `Bearer ${token}`});

        if(!response.data.success)
            throw new Error(response.data.message);
    
        result = response?.data;
    }
    catch(error){
        console.log(error);
        toast.error(error.response.data.message || "ERROR OCCURED WHILE FETCHING THE DATA");
        result = error.response?.data;
    }
    finally{
        toast.dismiss(toast_id)
        return result;
    }
}

