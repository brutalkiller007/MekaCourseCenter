import React, { useEffect, useState } from 'react'
import CourseStep from './AddCourse/CourseStep'
import { set_course_details, set_edit_course } from '../Slices/courseSlice';
import { useParams } from 'react-router-dom';
import { get_course_details } from '../Services/Service_Functions/DisplayCourses';
import { useDispatch, useSelector } from 'react-redux';

export const EditCourse = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {course_details} = useSelector((state) => state.course);
    const [loading, set_loading] = useState(false);

    useEffect(() => {
        
        const get_course_details_fun = async () => {
            set_loading(true);
            const result = await get_course_details(id);
            if (result) {
                dispatch(set_edit_course(true));
                dispatch(set_course_details(result[0]));
            }
            set_loading(false);
        };
        get_course_details_fun();
    }, [id, dispatch]);

    return (
        <div className='text-white'>

            <h1 className='text-3xl font-bold mb-6'>Edit Course</h1>

            {
                course_details && <CourseStep/>
            }
        </div>
    )
}
