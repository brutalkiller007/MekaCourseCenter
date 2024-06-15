import React, { useEffect, useState } from 'react'
import { get_enrolled_courses } from '../Services/Service_Functions/DisplayCourses';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import get_total_duration from '../Utility/Total_Duration';
import ProgressBar from '@ramonak/react-progress-bar';
import Spinner from '../Components/Common/Spinner';

function CourseCard({course}){

    const [duration, set_duration] = useState(0);
    const [progress, set_progress] = useState(0);
    
    useEffect(() => {
        
        const prog = (course.completed_videos.length / course.course_id.total_lectures) * 100 || 0;
        set_progress(prog);
        let total = get_total_duration(course?.course_id.course_content);
        set_duration(total);

        // eslint-disable-next-line 
    }, [])
    return(
        <>
            <Link to={`/view_course/${course.course_id._id}/section/${course.course_id.course_content[0]._id}/sub_section/${course.course_id.course_content[0].sub_section[0]._id}`}
                className='flex sm:flex-row flex-col border-b-[2px] border-richblack-700 py-2 w-full'>
                <div className='flex sm:flex-row flex-col sm:w-3/5  gap-2'>
                    <img src={course.course_id.thumbnail} alt='' loading='lazy' className='sm:max-w-[200px] object-cover sm:max-h-[150px]'></img>

                    <div>
                        <p className='text-[16px] font-semibold'>{course.course_id.course_name}</p>
                        <p className='text-pure-greys-300'>{course.course_id.course_description}</p>
                    </div>
                </div>

                <div className='text-white flex sm:flex-col justify-between h-fit sm:w-1/5 w-full'>
                    <h2 className='text-[16px]'>Duration</h2>
                    <p className='text-[13px]'>{duration}</p>
                </div>

                <div className='sm:w-1/5 w-full flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <h2 className='text-[16px]'>Progress</h2>
                        <p>{progress}%</p>
                    </div>
                    {
                        progress !== 100 && 
                        <ProgressBar completed={progress} height="8px" labelSize='0' customLabel='welcome' bgColor='#0000ff'/>
                    }
                    {
                        progress === 100 && 
                        <ProgressBar completed={progress} height="8px" labelSize='0' customLabel='welcome' bgColor='#00ff00'/>
                    }
                    
                </div>
            </Link>            
        </>
    )
}
export default function EnrolledCourses() {

    const [enrolled_courses, set_enrolled_courses] = useState(null);
    const [loading, set_loading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    async function get_enrolled_courses_fun(){
        
        set_loading(true);
        const result = await get_enrolled_courses(token);

        if(result.success === true)
            set_enrolled_courses(result.all_courses);
        set_loading(false);
        
    }

    useEffect(() => {
        get_enrolled_courses_fun();

        // eslint-disable-next-line 
    }, [])

    if(loading)
        return (<Spinner/>)

    return (
        <div className='text-white'>
            <h1 className='text-3xl font-bold text-white'>Enrolled Courses</h1>

            <div className='border-[1px] border-richblack-700 mb-4 mt-2'></div>
            <div className='flex flex-col gap-4 sm:w-full w-5/6 mx-auto'>
                {
                    enrolled_courses &&
                    enrolled_courses.map((course, index) => (
                        <div key={index}>
                            <CourseCard course={course}/>
                        </div>
                    ))
                }
                {
                    enrolled_courses && enrolled_courses.length === 0 &&
                        <div className='text-2xl font-semibold my-2 text-center text-pure-greys-300'>You haven't enrolled in any of the courses</div>
                }
            </div>
        </div>
    )
}
