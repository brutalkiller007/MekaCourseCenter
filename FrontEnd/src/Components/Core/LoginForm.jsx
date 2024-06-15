import React from 'react'
import {GoEye, GoEyeClosed} from "react-icons/go"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { log_in } from '../../Services/Service_Functions/Auth';
import { useDispatch } from 'react-redux';

export default function LoginForm() {

    const [x, SetX] = useState("password");
    const [loginData, setLoginData] = useState({email:"", password:""})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function eyehandler(event){
        event.preventDefault();
        if(x === "password")
            SetX("text")
        else    
            SetX("password");
    }

    function changeLoginData(event){
        setLoginData((prev) =>(
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }

    function handle_on_submit(event){
        event.preventDefault();
        dispatch(log_in(loginData, navigate));
    }

    return (
        <form className='my-5' onSubmit={handle_on_submit}>
            <div className="mail flex flex-col text-white">
                <label className="text-[16px] text-white">Email Address<sup className="text-pink-300 ">*</sup></label>
                <input type="email" placeholder="Enter your mail" 
                    name="email"
                    value = {loginData.email}
                    onChange={changeLoginData}
                    className="w-full rounded-md px-2 py-3 mt-1  bg-richblack-800 border-b-[1px] border-pure-greys-300"></input>
            </div>

            <div className="pass flex flex-col mt-4 text-white">
                <label className="text-[16px] text-white">Password<sup className="text-pink-300 ">*</sup></label>
                <div className="flex relative items-center">
                    <input type={x} placeholder="Enter Password"
                        name="password"
                        value={loginData.password}
                        onChange={changeLoginData}
                        className="w-full rounded-md px-2 py-3 mt-1  bg-richblack-800 border-b-[1px] border-pure-greys-300">
                    </input>
                    <button className="eye absolute right-0 rounded-md p-2 mt-1 bg-richblack-800  text-white" onClick={eyehandler}>
                        {
                            (x === "password") ? <GoEye></GoEye> : <GoEyeClosed></GoEyeClosed>
                        }
                    </button>
                </div>

                <Link to="/reset_password" className="w-full text-right text-[12px] hover:cursor-pointer text-caribbeangreen-50">
                    forget password??
                </Link>
            </div>

            <button type='submit' className='w-full bg-yellow-50 py-2 rounded-md text-black font-bold mt-8'>
                    Log In
            </button>
        </form>
        
    )
}
