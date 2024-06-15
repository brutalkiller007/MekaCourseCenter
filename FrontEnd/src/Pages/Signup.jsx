import React from "react";
import pic from "../Assets/Images/signup.webp";
import frame from "../Assets/Images/frame.png";
import SignupForm from "../Components/Core/SignupForm";
import { useSelector } from "react-redux";
import Spinner from "../Components/Common/Spinner";

const Signup = () => {

    const {loading} = useSelector((state) => state.auth);

    return(
        <div className="w-full bg-richblack-900">
            
            {
                loading ? <Spinner/> :
                (
                <div className="w-11/12 lg:w-10/12 flex flex-col-reverse mx-auto gap-8 py-[50px] md:flex-row justify-around">
                
                    <div className="md:w-[400px]">
                        <h1 className="text-white text-3xl font-bold">Join the millions learning to code with StudyNotion for free</h1>

                        <p className="text-white opacity-70 mt-4">Build shills for today, tomorrow, and beyond.
                            <span className="text-[#00BFFF] font-semibold"><i> Education to future-proof your career.</i></span>
                        </p>
                        <SignupForm/>
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

export default Signup;