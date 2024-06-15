import React, { useEffect, useState } from 'react';
import Get_Avg_Rating from '../../Utility/Avg_Rating';
import RatingStars from '../../Components/Common/RatingStars';
import { Link } from 'react-router-dom';

export default function CourseCard({course}) {

    const [avg_rating, set_avg_rating] = useState(0);

    useEffect(() => {
        const avg = Get_Avg_Rating(course.rating_and_reviews);
        set_avg_rating(avg);
         // eslint-disable-next-line
    }, [])
    return (
        <div className='bg-richblack-900 p-4 w-fit rounded-md text-white'>
            <Link to={`/course/${course._id}`} className='mx-auto'>
                <div className='mb-2'>
                    <img src={course.thumbnail} alt='course pic' loading='lazy' className='object-cover'></img>
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='text-xl font-semibold'>{course.course_name}</h1>

                    <div className='text-[18px] font-semibold'>By : {course.instructor.first_name} {course.instructor.last_name}</div>

                    <div className='flex gap-2 items-center text-yellow-50'>
                        <p>{avg_rating}</p>
                        <RatingStars avg_rating={avg_rating}/>
                        <p className="text-pure-greys-300">{course.rating_and_reviews.length} Ratings</p>
                    </div>

                    <div className='text-xl font-semibold'>Rs. {course.price}</div>
                </div>
            </Link>
        </div>
    )
}
