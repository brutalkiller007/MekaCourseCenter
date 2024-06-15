import React from 'react'
import frame from "../Assets/Images/frame.png";
import pic from "../Assets/Images/login.webp";
import LoginForm from '../Components/Core/LoginForm';
import {useSelector } from 'react-redux';
import Spinner from '../Components/Common/Spinner';
export default function Login() {

    const {loading} = useSelector((state) => state.auth);

    return (
        <div className="w-full bg-richblack-900 min-h-screen">
            {
                loading ? (

                <Spinner/> ):(
                <div className="w-11/12 lg:w-10/12 flex flex-col-reverse mx-auto gap-8 py-[50px] md:flex-row justify-around">
                
                <div className="md:w-[400px] my-auto">
                    <h1 className="text-white text-3xl font-bold">Welcome Back</h1>

                    <p className="text-white opacity-70 mt-4">Build shills for today, tomorrow, and beyond.
                     <span className="text-[#00BFFF] font-semibold"><i> Education to future-proof your career.</i></span>
                    </p>

                    <LoginForm/>
                </div>

                <div className="relative flex w-[90%] mx-auto md:w-fit md:mx-0 my-auto">
                    <img src={pic} alt="frame" className="relative z-10 w-[500px] aspect-square"></img>
                    <img src={frame} alt="frame" className="absolute top-4 left-4 w-[500px] aspect-square"></img>
                </div>

            </div>
            )
            }  
        </div>

        
  )
}
