import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import { get_course_details } from '../../Services/Service_Functions/DisplayCourses';
import Get_Avg_Rating from '../../Utility/Avg_Rating';
import RatingStars from '../../Components/Common/RatingStars';
import { convertToReadableDate } from '../../Utility/Change_date';
import get_total_duration from '../../Utility/Total_Duration';
import SectionBlock from './SectionBlock';
import CourseCard from './CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { buy_courses } from '../../Services/Service_Functions/Payment';
import { MdOutlineInfo } from "react-icons/md";
import ConfirmationModel from '../../Components/Common/ConfirmationModel';
import { add_course_to_cart } from '../../Services/Service_Functions/Cart';
import Spinner from '../../Components/Common/Spinner';
import ReviewSlider from '../../Components/Common/ReviewSlider';

export default function CoursePage() {

    const {course_id} = useParams();
    const [course_details, set_course_details] = useState(null);
    const [avg_rating, set_avg_rating] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {user_details} = useSelector((state) => state.profile);
    const {cart, total} = useSelector((state) => state.cart);
    const {loading} = useSelector((state) => state.profile);
    const {payment_loading} = useSelector((state) => state.course);

    const [confirmation_model,set_confirmation_model] = useState(null);

    const get_course_details_fun = async () => {
        
        const toast_id = toast.loading("LOADING....");
        const result = await get_course_details(course_id);
        console.log(result);
        if(result){
            const avg = Get_Avg_Rating(result[0].rating_and_reviews);
            set_avg_rating(avg);
            console.log(avg_rating);
            set_course_details(result[0]);
        }
        toast.dismiss(toast_id);
    };

    async function buy_course_fun(){
        if(token === null){
            not_login();
            return;
        }

        set_confirmation_model({
            data_1: "Buy Course ???",
            data_2: "Please note that money will be deducted from your account",
            btn1_text: "Buy Now",
            btn2_text: "Cancel",
            btn1_fun: async () => {
                            
                            let flag;
                            if(cart?.includes(course_id)){
                                flag = {
                                    cart_id : user_details.cart._id,
                                    course_id : course_id,
                                    total : total - course_details.price
                                }
                            }

                            await buy_courses([course_id], token, user_details, dispatch, navigate, flag); 

                            set_confirmation_model(null)
                        },
            btn2_fun: () => set_confirmation_model(null)
        })
    }

    async function add_to_cart_fun(){
        if(token === null){
            not_login();
            return;
        }

        if(cart.includes(course_id)){
            toast.error("COURSE ALREADY PRESENT IN THE CART");
            return;
        }
        
        dispatch(add_course_to_cart(user_details.cart._id, course_id, total + course_details.price, token));
    }

    function not_login(){
        set_confirmation_model({
            data_1: "You are not logged in",
            data_2: "Please Login to add to cart",
            btn1_text: "Log In",
            btn2_text: "Cancel",
            btn1_fun: () => {navigate("/login"); 
                            set_confirmation_model(null)
                        },
            btn2_fun: () => set_confirmation_model(null)
        })
    }
    useEffect(() => {
        get_course_details_fun();

         // eslint-disable-next-line
    }, [course_id])

    if(payment_loading || loading){
        return(
            <Spinner/>
        )
    }
    return (
        <div className='min-h-screen bg-richblack-900'>
            {
                course_details && (
                    <>  
                        <div className='relative bg-richblack-800 md:py-20 py-5 text-white' >
                            <div className='relative w-11/12 lg:w-3/4 mx-auto '>

                                <div className='absolute w-2/6 right-0 md:block hidden'>
                                    <CourseCard course_details={course_details} buy_course_fun={buy_course_fun} add_to_cart_fun={add_to_cart_fun} />
                                </div>

                                <img src={course_details.thumbnail} className='md:hidden w-full shadow-white' alt='' ></img>
                                
                                <div className='text-[16px] flex flex-col gap-2 w-fit'>

                                    <h1 className='text-3xl font-bold'>{course_details.course_name}</h1>
                                    <p className='text-pure-greys-300 text-[18px]'>{course_details.course_description}</p>

                                    <div className='flex gap-2 place-items-center'>
                                        <p className='text-yellow-300'>{avg_rating}</p>
                                        <RatingStars avg_rating={avg_rating}/>
                                        <p>({course_details.rating_and_reviews.length} ratings)</p>
                                    </div>

                                    <div>
                                        {course_details.students_enrolled.length} students enrolled
                                    </div>
                                    <div>
                                        Created By {course_details.instructor.first_name} {course_details.instructor.last_name}
                                    </div>

                                    <div className='flex place-items-center gap-1'>
                                        <MdOutlineInfo />
                                        Created At {convertToReadableDate(course_details.created_at)}
                                    </div>
                                </div>

                                <div className='border-y-[1px] border-richblack-700 py-3 flex flex-col gap-4 md:hidden mt-5'>
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
                                        <button className='w-full py-2 font-boldrounded-md' onClick={() => add_to_cart_fun()}>Add to Cart</button>
                                    }
                                </div>

                            </div>

                        </div>

                        <div className=' w-11/12 lg:w-3/4 mx-auto'>
                            <div className='md:w-3/5 flex flex-col py-10 gap-6'>
                                <div className='text-white'>
                                    <div className='border-[1px] border-richblack-700 p-5'>
                                        <h1 className='text-2xl font-bold mb-4'>What you'll learn</h1>
                                        <p className='text-[16px]'>{course_details.what_you_will_learn}</p>
                                    </div>
                                </div>

                                <div className=' text-white'>
                                    <h1 className='text-2xl font-bold'>Course Content</h1>

                                    <div className='div flex gap-2 mb-2 flex-wrap'>
                                        <div>{course_details.course_content.length} section(s)</div>
                                        <div>{course_details.total_lectures} lecture(s)</div>
                                        <div>{get_total_duration(course_details.course_content)} total length</div>
                                    </div>

                                    <div>
                                        {
                                            course_details?.course_content?.map((section, ind) => (
                                                <SectionBlock key={ind} section={section}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                
                                <div className='text-white'>
                                    <h1 className="w-11/12 lg:3/4 mx-auto font-bold text-center text-2xl">Rating and Reviews of our Courses from Other Learners</h1>
                                    <ReviewSlider all_ratings={false} course_id={course_id}/>
                                </div>
                                <div className='text-white flex flex-col gap-2'>
                                    <h1 className='text-2xl font-bold'>Author</h1>

                                    <div className='flex gap-2 text-xl items-center text-[#43c843] font-semibold'>
                                        <img src={course_details.instructor.image} alt='' loading='lazy' className='w-[50px] h-[50px] object-cover rounded-[50%]'></img>
                                        <p className='ml-2'>{course_details.instructor.first_name}</p>
                                        <p>{course_details.instructor.last_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {
                confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>
            }

        </div>
    )
}
