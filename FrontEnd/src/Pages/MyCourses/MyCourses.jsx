import React, { useEffect } from 'react'
import { get_instructor_courses } from '../../Services/Service_Functions/DisplayCourses';
import {useSelector } from 'react-redux';
import { set_loading } from '../../Slices/profileSlice';
import { useState } from 'react';
import CourseTable from './CourseTable';
import Spinner from "../../Components/Common/Spinner";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set_course_details } from '../../Slices/courseSlice';

export default function MyCourses() {

    const {token} = useSelector((state) => state.auth);
    const [all_courses, set_all_courses] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const get_courses = async () => {
        try{
            set_all_courses(await get_instructor_courses(token));
            console.log(all_courses);
        }
        catch(error){
            console.log("Could not fetch category list");
        }
    }
    
    useEffect(() => {
        
        set_loading(true);
        get_courses();
        set_loading(false);
        dispatch(set_course_details(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='text-white'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-3xl font-bold'>My Courses</h1>

                <button className='flex gap-2 items-center bg-yellow-300 px-3 py-2 rounded-md text-black w-fit font-bold' 
                    onClick={() => {
                        navigate("/dashboard/add_course")
                    }}>
                    <p>Add Course</p>
                    <FaPlus />
                </button>
            </div>
            {
                all_courses === null || all_courses === undefined ? <Spinner></Spinner> : <CourseTable all_courses={all_courses} set_all_courses={set_all_courses}/>
            }

        </div>
    )
}
