import React from 'react'
import CourseCard from './CourseCard';
import { Swiper, SwiperSlide} from 'swiper/react';

import "swiper/css";
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

export default function CourseSlider({courses}) {
    return (
        <div className='p-3 bg-richblack-900'>
            {
                courses.length === 0 ? (<div className=' font-semibold text-xl text-richblack-300'>
                        No Courses are found in this section
                </div>) : 
                    
                <Swiper pagination={true} modules={[Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView : 1
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }}>
                    {
                        courses.map((course, index) => (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
        </div>
    )
}
