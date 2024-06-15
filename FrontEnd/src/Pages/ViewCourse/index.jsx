import React, { useEffect } from 'react'
import { get_view_course_details } from '../../Services/Service_Functions/DisplayCourses'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../../Components/Common/Spinner';
import { set_completed_videos, set_course_details, set_course_section_details, set_total_lectures } from '../../Slices/ViewCourseSlice';
import get_total_duration from '../../Utility/Total_Duration';
import ViewCourseSideBar from './ViewCourseSideBar';
import ReviewModal from './ReviewModal';
import "video-react/dist/video-react.css";
import { AiOutlineMenu } from "react-icons/ai";

export default function ViewCourse() {

    const {course_id} = useParams();
    const {token} = useSelector((state) => state.auth);
    const [loading, set_loading] = useState(false);
    const dispatch = useDispatch();
    const [review_modal, set_review_modal] = useState(false);
    const [state, set_state] = useState(false);

    function toggle_state(){
        set_state(!state);
    }

    async function get_view_course_details_fun(){
        set_loading(true);
        const result = await get_view_course_details(course_id, token);
        
        if(result.success){
            dispatch(set_completed_videos(result.completed_videos));
            dispatch(set_course_section_details(result.section_details));

            const total_duration = get_total_duration(result.section_details);
            dispatch(set_course_details({...result.course_details, total_duration}));

            let total = 0;
            result.section_details.forEach(element => {
                total += element.sub_section.length;
            });
            dispatch(set_total_lectures(total));
        }
        set_loading(false);
        console.log(result);
    }

    useEffect(() => {
        get_view_course_details_fun();
        // eslint-disable-next-line
    }, [course_id]);

    if(loading)
        return (<Spinner/>)

    return (
        <div className='flex justify-between relative bg-richblack-900'>

            <div className='bg-richblack-800 hidden lg:block'>
                <ViewCourseSideBar set_review_modal={set_review_modal}/>    
            </div>

            <div className='lg:hidden block absolute text-pure-greys-300'>
                {
                    !state && <button onClick={() => toggle_state()} className='top-3 left-3 relative z-30'>
                        <AiOutlineMenu size={25}/>
                    </button>
                }
                {   
                    <div className='absolute top-0'>
                        <ViewCourseSideBar set_review_modal={set_review_modal} state={state} toggle_state={toggle_state}/>
                    </div>
                    
                }
            </div>
                
            <div className='min-h-[calc(100vh-3.5rem)] bg-richblack-900 lg:py-0 w-full'>
                <Outlet/>
            </div>

            {
                review_modal && <ReviewModal close_fun={() => set_review_modal(false)}/>
            }
        </div>
    )
}
