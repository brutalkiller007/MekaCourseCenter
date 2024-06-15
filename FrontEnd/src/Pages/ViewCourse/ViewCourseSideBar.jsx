import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

export default function ViewCourseSideBar({set_review_modal, state, toggle_state}) {

    const {course_section_details, completed_videos, total_lectures, course_details} = useSelector((state) => state.view_course);
    const {section_id, sub_section_id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [active_section, set_active_section] = useState("");
    const [active_sub_section, set_active_sub_section] = useState("");

    useEffect(() => {
        
        if(!course_section_details || !course_section_details.length)
            return;
        const active_section_index = course_section_details.findIndex((item) => item._id === section_id);
        const active_sub_section_index = course_section_details[active_section_index]?.sub_section?.findIndex((item) => item._id === sub_section_id);

        if(active_section_index !== undefined)
            set_active_section(section_id);
        if(active_sub_section_index !== undefined)
            set_active_sub_section(sub_section_id);

        // eslint-disable-next-line
    }, [location.pathname, course_details, course_section_details]);
    return (
        <div className={`bg-richblack-800 max-w-[350px] w-[320px] min-h-[calc(100vh-3.5rem)] text-white transition-all duration-300 relative
                ${state ? "translate-x-0 z-30" : "-translate-x-full z-0"} lg:translate-x-0 ease-in overflow-y-scroll lg:overflow-auto`}>
            <button className='lg:hidden pt-3 pl-3' onClick={() => toggle_state()}>
                <IoCloseSharp size={25}/>
            </button>
            <div className='px-4 flex flex-col gap-4 pt-4'>
                <div className='flex justify-between'>
                    <button className='grid place-items-center bg-white text-black p-2 rounded-[50%]'
                        onClick={() => {
                            navigate("/dashboard/enrolled_courses")
                        }}>
                        <FaChevronLeft size={25}/>
                    </button>

                    <button className='text-black font-bold px-3 py-2 bg-yellow-300 rounded-md' 
                        onClick={() => set_review_modal(true)}>
                        Add Review
                    </button>
                </div>

                <div className='border-b-[3px] border-richblack-700 pb-2'>
                    <h1  className='font-bold text-2xl'>{course_details?.course_name}</h1>
                    <div className='text-[16px] text-pure-greys-200'>{completed_videos.length} / {total_lectures}</div>
                </div>
            </div>

            <div className='my-2 flex flex-col gap-2 pb-5'>
                {
                    course_section_details?.map((section, index) => (
                        <div className='' key={index}>
                            <div className='flex bg-richblack-600 p-3 justify-between items-center'>
                                <p className='text-[18px] font-semibold'>{section.section_name}</p>

                                <button onClick={() => {
                                    if(active_section === section._id)
                                        set_active_section("");
                                    else
                                        set_active_section(section._id);
                                }}>
                                    {
                                        active_section === section._id ? <FaAngleUp/> : <FaAngleDown/>
                                    }
                                </button>
                            </div>

                            {
                                active_section === section._id &&
                                <div className=''>
                                    {
                                        section.sub_section.map((sub_section, i) => (
                                            <button className={` ${sub_section._id === active_sub_section && "bg-yellow-300 text-black font-semibold"} items-center flex w-full gap-2 px-3 py-2 justify-start`} 
                                            key={i} type='button'
                                                onClick={() => {
                                                    navigate(`/view_course/${course_details._id}/section/${active_section}/sub_section/${sub_section._id}`);
                                                    toggle_state();
                                                }}>
                                                {
                                                    completed_videos.includes(sub_section._id) ? 
                                                        (<input type='checkbox'
                                                            defaultChecked
                                                            readOnly
                                                            style={{scale: "1.2"}}>
                                                        </input>)
                                                         : 
                                                        (<input type='checkbox'
                                                            readOnly
                                                            style={{scale: "1.2"}}>
                                                        </input>)
                                                }
                                                <p>{sub_section.title}</p>
                                            </button>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
