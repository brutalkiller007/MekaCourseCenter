import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_cart_courses, remove_course_from_cart } from '../Services/Service_Functions/Cart';
import { useState } from 'react';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { buy_courses } from '../Services/Service_Functions/Payment';
import { useNavigate } from 'react-router-dom';

export default function Cart() {

    const {user_details} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {cart, total, total_items} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [cart_courses, set_cart_courses] = useState(null);

    async function get_cart_courses_fun(){
        const result = await get_cart_courses(user_details?.cart?._id, token);
        
        if(result?.success === true){
            set_cart_courses(result.cart);
        }
    }
    useEffect(() => {
        get_cart_courses_fun();
        // eslint-disable-next-line
    }, [cart])
    
    async function handle_buy_courses(){

        await buy_courses(cart, token, user_details, dispatch, navigate);
    }

    async function handle_remove_from_cart(course_id){
        let total = 0;

        cart_courses?.cart_courses?.forEach(course => {
            if(course._id !== course_id)
                total += course.price;
        });

        dispatch(remove_course_from_cart(user_details?.cart?._id, course_id, total, token))
    }

    return (
        <div>
            <h1 className='text-3xl font-bold text-white'>Cart</h1>

            <div className='text-pure-greys-300 border-b-[1px] text-[18px] font-semibold'>
                {total_items} Courses in cart
            </div>
            
            <div className='flex flex-col-reverse lg:gap-4 lg:flex-row'>
                {
                    cart_courses && (
                        <>    
                            <div className='w-full flex flex-col gap-6'>
                                {
                                    cart_courses.cart_courses.length === 0 && 
                                        (<div className='text-2xl font-semibold my-2 text-center text-pure-greys-300'>
                                            No Courses are present in the cart
                                        </div>)
                                }
                                {   
                                    cart_courses.cart_courses.length !== 0 &&

                                    cart_courses?.cart_courses?.map((course, index) => (
                                        <div className='flex md:flex-row flex-col justify-between p-3 border-b-2 border-richblack-700' key={index}>
                                            
                                            <div className='flex gap-2 md:flex-row flex-col'>
                                                <img src={course.thumbnail} className="md:w-[220px] md:h-[140px]" alt=''></img>

                                                <div className='text-white'>
                                                    <h1 className='text-xl font-semibold'>{course.course_name}</h1>
                                                    <p className='text-pure-greys-300'>{course.course_description}</p>
                                                    <p className='text-[#389a38] font-semibold'>{course.category.name}</p>
                                                </div>
                                            </div>

                                            <div className='flex md:flex-col flex-row-reverse gap-3 justify-between h-fit'>
                                                <button type='button' className='flex gap-2 px-3 py-2 text-[#FF0000] items-center bg-richblack-700 rounded-md'
                                                        onClick={() => {
                                                            handle_remove_from_cart(course._id)
                                                        }}>
                                                    <RiDeleteBin6Line />
                                                    <p>Remove</p>
                                                </button>

                                                <div className='text-yellow-300 text-2xl font-bold flex gap-1 items-center justify-end'>
                                                    <FaIndianRupeeSign />
                                                    <p>{course.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {
                                cart_courses?.cart_courses?.length !== 0 && 
                                <div className='lg:w-1/5 bg-richblack-800 p-3 h-fit flex lg:flex-col justify-between items-center mb-5'>
                                    <div className='flex flex-col gap-1 mb-6'>
                                        <p className='text-pure-greys-300'>Total</p>
                                        <div className='text-yellow-200 font-bold flex items-center text-2xl'>
                                            <FaIndianRupeeSign />
                                            <p>{total}</p>
                                        </div>
                                    </div>

                                    <button className='py-2 px-3 text-black font-bold bg-yellow-200 rounded-md w-fit h-fit lg:w-full' onClick={handle_buy_courses} >Buy Now</button>
                                </div>
                            }

                        </>
                    )
                }
            </div>
            
        </div>
    )
}
