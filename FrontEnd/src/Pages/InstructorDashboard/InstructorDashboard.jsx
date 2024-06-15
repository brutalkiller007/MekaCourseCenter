import React from 'react'
import { useEffect } from 'react'
import { get_instructor_dashboard_details } from '../../Services/Service_Functions/DisplayCourses';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Spinner from '../../Components/Common/Spinner';
import InstructorChart from './InstructorChart';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Link } from 'react-router-dom';

import "swiper/css";
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

export default function InstructorDashboard() {

    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile);
    const [data, set_data] = useState(null);
    const [loading, set_loading] = useState(false);

    useEffect(() => {
        ;(async () => {
            set_loading(true);
            const result = await get_instructor_dashboard_details(token);

            if(result.success)
                set_data(result);
            set_loading(false);
        } )()
        // eslint-disable-next-line
    }, []);

    if(loading && data === null)
        return <Spinner/>

    return (
        <div>

            <div className='text-white mb-3'>
                <h2 className='text-2xl font-bold'>
                    Hi {user_details.first_name}
                </h2>

                <p className='text-pure-greys-300'>Lets start something new</p>
            </div>
            {
                data !== null && data?.course_data?.length !== 0 && 
                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col md:flex-row gap-4'>
                        <div className='md:w-3/4'>
                            <InstructorChart courses_data={data.course_data}/>
                        </div>

                        
                        <div className='text-white p-4 bg-richblack-800 md:w-1/4 rounded-lg flex flex-col gap-4'>
                            <h1 className='font-bold text-xl'>Statistics</h1>

                            <div >
                                <p className=' text-pure-greys-300'>Total Courses</p>
                                <p className='text-2xl font-semibold'>{data.course_data.length}</p>
                            </div>

                            <div>
                                <p className=' text-pure-greys-300'>Total Students</p>
                                <p className='text-2xl font-semibold'>{data.total_students_count}</p>
                            </div>

                            <div>
                                <p className=' text-pure-greys-300'>Total Income</p>
                                <p className='text-2xl font-semibold'>Rs. {data.total_amount_generated}</p>
                            </div>
                        </div>
                    </div>

                    <div className='text-white bg-richblack-800 p-5 rounded-lg w-full'>

                        <h1 className='font-bold text-xl mb-2'>
                            Your Courses
                        </h1>
                        <Swiper pagination={true} modules={[Pagination]}
                            breakpoints={{
                                512: {
                                    slidesPerView : 2,
                                    spaceBetween: 20
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30
                                }
                            }}>
                            {
                                data.course_data.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <Link to={`/course/${item._id}`} className='w-full mx-auto'>
                                            <img src={item.thumbnail} alt='' className='object-cover w-full aspect-video'></img>
                                            <h1 className='text-[18px] font-semibold'>{item.course_name}</h1>
                                            <div className='text-[14px]'>{item.students_count} students | Rs. {item.amount_generated}</div>
                                        </Link>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                </div>
            }

            {
                data?.course_data.length === 0 && 
                <div className='text-2xl font-semibold my-2 text-center text-pure-greys-300'>
                    You have not created any courses yet.
                </div>
            }
        </div>
    )
}
