import React from 'react'
import { FaShareFromSquare } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CourseCard({course_details, add_to_cart_fun , buy_course_fun}) {

    const {user_details} = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const copy_url = () => {

        const current_url = window.location.href;

        navigator.clipboard.writeText(current_url)
        .then(() => toast.success("URL COPIED SUCCESSFULLY"))
        .catch(() => toast.error("ERROR IN COPYING URL"));
    }

    return (
        <div className='p-4 bg-richblack-700 rounded-lg flex flex-col gap-3'>
            <img src={course_details.thumbnail} alt='' className='w-full object-cover'></img>
            
            <div className='text-2xl font-semibold'>Rs. {course_details.price}</div>

            <button className='w-full py-2 text-black font-bold bg-yellow-300 rounded-md' onClick={() => {
                course_details.students_enrolled?.includes(user_details?._id) ? navigate("/dashboard/enrolled_courses") : buy_course_fun()
            }}>
                {
                    course_details.students_enrolled?.includes(user_details?._id) ? "Go to Course" : "Buy Now"
                }
            </button>

            {
                !course_details.students_enrolled?.includes(user_details?._id) &&
                <button className='w-full py-2 font-bold bg-richblack-900 rounded-md' onClick={() => add_to_cart_fun()}>Add to Cart</button>
            }

            <div>
                <h1 className='font-semibold'>Course Requirements : </h1>
                <div className='flex flex-col gap-1'>
                    {
                        course_details?.instructions.map((item, ind) => (
                            <div key={ind} className='flex gap-2 text-[#46ae46] items-center text-[14px]'>
                                <FaArrowRightLong size={14}/>
                                <p className='' >{item}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <button type='button' className='flex gap-1 text-yellow-300 items-center font-bold justify-center' onClick={copy_url}>
                <FaShareFromSquare size={15}/>
                <p>Share</p>
            </button>
        </div> 
    )
}
