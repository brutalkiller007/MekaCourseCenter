import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";
import Spinner from '../Components/Common/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { send_reset_password_token } from '../Services/Service_Functions/Auth';

export default function ResetPassword() {

    const [mail_sent, set_mail_sent] = useState(false);
    const [email, set_email] = useState("");
    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    function change_data(event){
        set_email(event.target.value);
    }

    function handle_click(event){
        event.preventDefault();
        dispatch(send_reset_password_token(email, set_mail_sent));
    }

    return (
        <div className='w-[100%] h-[100vh] bg-richblack-900'>
            {
                loading ? (<Spinner/>) : (
                    <div className='text-white flex flex-col w-11/12 md:w-1/2 lg:w-[400px] h-full justify-center gap-4 mx-auto'>
                        {
                            mail_sent ? (<div className='text-3xl font-bold'>
                                Please check your mail
                            </div>) : (<div className='text-3xl font-bold'>
                                Reset Your Password 
                            </div>)
                        }
                        {
                            mail_sent ? (<div className='text-[18px] opacity-60'>
                                We have sent the reset password link to your email {email}
                            </div>) : (<div className='text-[18px] opacity-60'>
                                Have no fear. We'll email you instructions to reset your password.
                                If you dont have access to your email we can try account recovery
                            </div>)
                        }
                        {
                            (!mail_sent) && (<div className="mail flex flex-col">

                                <label className="text-[16px]">Email Address <sup className="text-pink-300">*</sup> </label>
                                <input type="email" name="email" 
                                    value = {email}
                                    onChange={change_data}
                                    placeholder="Enter mail address" className="px-2 py-3 mt-1 rounded-md bg-richblack-800 border-b-[1px] border-pure-greys-200"></input>
                    
                            </div>)
                        }
                        {
                            <div>
                                <button className='w-full py-3 px-2 bg-yellow-100 rounded-md text-black font-bold' onClick={handle_click}>
                                    {mail_sent ? "Resend Email" : "Submit"}
                                </button>
                            </div>
                        }

                        <Link to={"/login"} className='flex items-center gap-2'>
                            <FaLongArrowAltLeft />
                            <p>Back to login</p>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
