import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Spinner from '../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {GoEye, GoEyeClosed} from "react-icons/go";
import { reset_password } from '../Services/Service_Functions/Auth';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function UpdatePassword() {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {id} = useParams();

    const [x, setX] = useState("password");
    const [xx, setXX] = useState("password");

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

    function on_submit(data){
        dispatch(reset_password(data.password, data.confirm_password, id));
    }

    return (
        <div className='w-[100%] h-[100vh] bg-richblack-900'>
            {
                loading ? (<Spinner/>) : (
                    <form onSubmit={handleSubmit(on_submit)} className='text-white flex flex-col w-11/12 md:w-1/2 lg:w-[400px] h-full justify-center gap-4 mx-auto'>
                        <div className='text-3xl font-bold'>Change Your Password </div>

                        <div className='text-[18px] opacity-60'>
                              Almost done. Enter your new password and you are all set.
                        </div>

                        <div className="flex flex-col gap-4 w-full justify-between">
                            <div className="flex flex-col">
                                <label className="text-[16px]">New Password <sup className="text-pink-300">*</sup></label>
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

                        <div>
                            <button type='submit' className='w-full py-3 px-2 bg-yellow-100 rounded-md text-black font-bold'>
                                Reset Password
                            </button>
                        </div>

                        <Link to={"/"} className='flex items-center gap-2'>
                            <FaLongArrowAltLeft />
                            <p>Back to login</p>
                        </Link>
                    </form>
                )
            }
        </div>
    )
}
