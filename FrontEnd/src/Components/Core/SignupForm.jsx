import React from 'react'
import { useState } from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go";
import {useDispatch } from 'react-redux';
import { set_signup_data } from '../../Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { send_otp } from '../../Services/Service_Functions/Auth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

export default function SignupForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [x, setX] = useState("password");
    const [xx, setXX] = useState("password");
    const [acc_type, set_acc_type] = useState("Student");

    function eyehandler1(event){
        event.preventDefault();
        if(x === "password")
            setX("text")
        else    
            setX("password");
    }

    function eyehandler2(event){
        event.preventDefault();
        if(xx === "password")
            setXX("text")
        else    
            setXX("password");
    }

    const on_submit = (data) => {

        if(data.password !== data.confirm_password)
            toast.error("Password and Confirm Password are not same");
        else{
            dispatch(set_signup_data({...data, acc_type}));
            console.log({...data, acc_type});
            dispatch(send_otp(data.email, navigate));
        }
    }
    
    return (
        <form onSubmit={handleSubmit(on_submit)} className='my-10 flex flex-col gap-4 text-white'>
            <div className='bg-richblack-800 text-white w-fit rounded-3xl p-1 border-b-[1px] border-pure-greys-300'>
                <button className={`${acc_type === "Student" ? "bg-richblack-900" : "bg-richblack-800"} px-5 py-2 rounded-3xl transition-all duration-200`}
                            onClick={(event) => {
                                event.preventDefault();
                                set_acc_type("Student");
                            }}>
                    Student
                </button>

                <button className={`${acc_type === "Instructor" ? "bg-richblack-900" : "bg-richblack-800"} px-5 py-2 rounded-3xl transition-all duration-200`}
                            onClick={(event) => {
                                event.preventDefault();
                                set_acc_type("Instructor");
                            }}>
                    Instructor
                </button>
            </div>

            <div className="name flex justify-between">
                <div className="flex flex-col">
                    <label className="text-[16px]">First Name <sup className=" text-pink-300 ">*</sup></label>
                    <input type="text" name="first_name" 
                        {...register('first_name', {required: true})}
                        placeholder="Enter first name" className="px-2 py-3 mt-1 rounded-md w-full  bg-richblack-800 border-b-[1px] border-pure-greys-300">
                    </input>
                    {errors.first_name && <p className='text-[#FF0000] text-[15px]'>First Name is required</p>}
                </div>

                <div className="flex flex-col ml-4">
                    <label className="text-[16px]">Last Name <sup className=" text-pink-300">*</sup> </label>
                    <input type="text" name="last_name" 
                        {...register('last_name', {required: true})}
                        placeholder="Enter Last name" className="px-2 py-3 mt-1 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-300">     
                    </input>
                    {errors.last_name && <p className='text-[#FF0000] text-[15px]'>Last Name is required</p>}
                </div>
            </div>

            <div className="mail flex flex-col">
                <label className="text-[16px]">Email Address <sup className="text-pink-300">*</sup> </label>
                <input type="email" name="email" 
                    {...register('email', {required: true})}
                    placeholder="Enter mail address" className="px-2 py-3 mt-1 rounded-md bg-richblack-800 border-b-[1px] border-pure-greys-200">
                </input>
                {errors.email && <p className='text-[#FF0000] text-[15px]'>Email is required</p>}
            </div>

            <div className="mail flex flex-col">
                <label className="text-[16px]">Contact Number <sup className="text-pink-300">*</sup> </label>
                <input type="number" name="contact_number" 
                    {...register('contact_number', {
                        required: {
                            value: true, message: "Contact Number is Required"
                        },
                        minLength:{
                            value: 10, message: "Invalid Number!!!!"
                        },
                        maxLength: {
                            value: 12, message: "Invalid Number!!!"
                        }
                    })}
                    placeholder="Enter your mobile number" className="px-2 py-3 mt-1 rounded-md bg-richblack-800 border-b-[1px] border-pure-greys-200"></input>
                {errors.contact_number && <p className='text-[#FF0000] text-[15px]'>{errors.contact_number.message}</p>}
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row w-full justify-between">
                <div className="flex flex-col">
                    <label className="text-[16px]">Create Password <sup className="text-pink-300">*</sup></label>
                    <div className="relative flex items-center">
                        <input type={x} 
                            placeholder="Enter Password" 
                            name="password"
                            {...register('password', {
                                required: {
                                    value: true, message: "Password is Required"
                                },
                                minLength:{
                                    value: 5, message: "Password should contain atleast 5 characters"
                                },
                            })}
                            className="px-2 py-3 mt-1 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-200"></input>
                        <button className="absolute right-0 rounded-md p-2 mt-1 bg-slate-900" onClick={eyehandler1}>
                        {
                            (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                        }
                        </button>
                    </div>
                    {errors.password && <p className='text-[#FF0000] text-[15px]'>{errors.password.message}</p>}
                </div>
                
                <div className="flex flex-col">
                    <label className="text-[16px]">Confirm Password <sup className="text-pink-300">*</sup></label>
                    <div className="relative flex items-center">
                        <input type={xx}
                            placeholder="Confirm Password" 
                            name="confirm_password"
                            {...register('confirm_password', {
                                required: {
                                    value: true, message: "Confirm Password is Required"
                                },
                                minLength:{
                                    value: 5, message: "Confirm Password should contain atleast 5 characters"
                                },
                            })}
                            className="px-2 py-3 mt-1 rounded-md w-full bg-richblack-800 border-b-[1px] border-pure-greys-200"></input>
                        <button className="absolute right-0 rounded-md p-2 mt-1 bg-slate-900" onClick={eyehandler2}>
                        {
                            (xx === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                        }
                        </button>
                    </div>
                    {errors.confirm_password && <p className='text-[#FF0000] text-[15px]'>{errors.confirm_password.message}</p>}
                </div>
            </div>
            
            <button type='submit' className='w-full bg-yellow-50 py-2 rounded-md text-black font-bold mt-8'>
                    Create Account
            </button>
        </form>
    )
}
