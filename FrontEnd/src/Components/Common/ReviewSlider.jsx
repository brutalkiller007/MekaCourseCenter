import React, { useEffect, useState } from 'react'
import { api_connector } from '../../Services/apiConnector';
import { rating_and_reviews } from '../../Services/apis';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import RatingStars from './RatingStars';

export default function ReviewSlider({all_ratings, course_id}) {

    const [rating_array, set_rating_array] = useState([]);

    async function get_all_ratings_fun(){

        const result = await api_connector("GET", rating_and_reviews.GET_ALL_RATINGS);
        if(result.data.success){
            set_rating_array(result.data.ratings);
        }
    }

    async function get_course_ratings_fun(){

        const result = await api_connector("POST", rating_and_reviews.GET_COURSE_RATINGS, {course_id});
        if(result.data.success){
            set_rating_array(result.data.ratings);
        }
    }


    useEffect(() => {

        if(all_ratings){
            get_all_ratings_fun();
        }
        else{
            get_course_ratings_fun();
        }

        // eslint-disable-next-line 
    }, [])
    return (
        <div className='py-12'>

            <Swiper modules={[FreeMode, Pagination, Autoplay]}
            loop={true}
            freeMode={true}
            autoplay={{
                disableOnInteraction: false,
                delay: 2000
            }}
            breakpoints={{
                512: {
                    slidesPerView : 2,
                    spaceBetween: 20
                },
            }}>
            {
                rating_array.map((rating, index) => (
                    <SwiperSlide key={index}>
                        <div className='bg-richblack-800 p-4 rounded-md w-[90%] mx-auto text-white flex flex-col gap-2'>
                            <div className='flex items-center gap-3'>
                                <img src={rating.user.image} className='w-[50px] aspect-square rounded-[50%] object-cover' alt=''></img>

                                <div className='flex flex-col gap-1'>
                                    <p>{rating.user.first_name} {rating.user.last_name}</p>
                                    <p className='text-pure-greys-300'>{rating.course.course_name}</p>
                                </div>
                            </div>

                            <div>
                                {rating.review}
                            </div>

                            <div className='flex items-center gap-2 text-yellow-300'>
                                <p>{rating.rating}</p>
                                <RatingStars avg_rating={rating.rating}/>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
            </Swiper>
        </div>
    )
}
