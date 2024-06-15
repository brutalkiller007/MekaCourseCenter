import React from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { change_password } from '../../Services/Service_Functions/Setting';
import { useForm } from 'react-hook-form';

export const PasswordUpdate = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const [x, setX] = useState("password");
    const [xx, setXX] = useState("password");
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

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
        dispatch(change_password(data, token));
    }

    return (
        <form onSubmit={handleSubmit(on_submit)} className='flex flex-col gap-5'>
            <div className="bg-richblack-800 p-5">
                <h1 className='font-bold text-xl mb-5'>Password</h1>

                <div className="grid md:grid-cols-2 gap-4 w-full">
                    <div className="flex flex-col">
                        <label className="text-[16px]">Current Password </label>
                        <div className="relative flex items-center">
                            <input type={x} 
                                placeholder="Enter Current Password" 
                                name="old_password"
                                {...register('old_password', {
                                required: {
                                    value: true, message: "Old Password is Required"
                                },
                            })}
                                className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-200">
                            </input>

                            <button className="absolute right-0 rounded-md p-2 bg-slate-900" onClick={eyehandler1}>
                            {
                                (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                            }
                            </button>
                        </div>
                        {errors.old_password && <p className='text-[#FF0000] text-[15px]'>{errors.old_password.message}</p>}
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="text-[16px]">Confirm Password</label>
                        <div className="relative flex items-center w-full">
                            <input type={xx}
                                placeholder="Enter New Password" 
                                name="new_password"
                                {...register('new_password', {
                                required: {
                                    value: true, message: "New Password is Required"
                                },
                                minLength:{
                                    value: 5, message: "New Password should contain atleast 5 characters"
                                },
                            })}
                                className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-200">        
                            </input>

                            <button className="absolute right-0 rounded-md p-2 bg-slate-900" onClick={eyehandler2}>
                            {
                                (xx === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                            }
                            </button>
                        </div>
                        {errors.new_password && <p className='text-[#FF0000] text-[15px]'>{errors.new_password.message}</p>}
                    </div>
                </div>
            </div>

            <div className='flex justify-end gap-2 items-center'>
                <Link to="/dashboard/my_profile" className='py-2 px-3 bg-richblack-700 rounded-md font-bold'>
                    <button>Cancel</button>
                </Link>

                <button type='submit' className='py-2 px-3 bg-yellow-200 rounded-md text-black font-bold'>Update</button>
            </div>

        </form>
    )
}
