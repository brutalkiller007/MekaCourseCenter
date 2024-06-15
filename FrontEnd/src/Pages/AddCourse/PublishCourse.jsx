import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { set_course_details, set_step } from '../../Slices/courseSlice';
import { update_course_details } from '../../Services/Service_Functions/Course';
import { useNavigate } from 'react-router-dom';

export const PublishCourse = () => {
    const {register, setValue, getValues, handleSubmit} = useForm();
    const {course_details} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(course_details.status === "Published")
            setValue("status", true);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function on_submit(){

        let total_lectures = 0;
        course_details?.course_content?.forEach(item => {
            total_lectures += item.sub_section.length;
        })
        console.log("total_lectures", total_lectures);

        if((getValues("status") === true && course_details.status === "Published") || (getValues("status") === false && course_details.status === "Draft")){
            if(total_lectures === course_details?.total_lectures){
                navigate("/dashboard/my_courses");
                dispatch(set_step(1));
                return;
            }
        }

        const form_data = new FormData();

        const value = getValues("status") ? "Published" : "Draft";
        form_data.append("course_id", course_details._id);
        form_data.append("total_lectures", total_lectures);
        form_data.append("status", value);
        form_data.append("token", token);

        dispatch(update_course_details(form_data, token, course_details, false));
        dispatch(set_step(1));
        dispatch(set_course_details(null));
        navigate("/dashboard/my_courses");
    }

    const go_back = () => {
        dispatch(set_step(2));
    }

    return (
        <div className='bg-richblack-800 p-5 flex flex-col gap-3'>
            <h1 className='text-3xl font-bold '>Publish Settings</h1>

            <form onSubmit={handleSubmit(on_submit)} className='flex flex-col gap-5'>
                <div className='flex gap-2'>
                    <input type="checkbox" name='status'
                        {...register("status")}></input>

                    <label>Make this course as public</label>
                </div>

                <div className='flex gap-2 justify-end'>
                    <button type="button" className='px-3 py-2 text-black bg-richblack-300 rounded-md font-bold' onClick={go_back}>Back</button>

                    <button type='submit' className='px-3 py-2 text-black bg-yellow-300 rounded-md font-bold' >Submit</button>
                </div>
            </form>
        </div>
    )
}
