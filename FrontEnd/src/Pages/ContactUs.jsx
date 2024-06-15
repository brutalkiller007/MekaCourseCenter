import React from 'react'
import ContactUsForm from '../Components/Common/ContactUsForm';
import { AiFillWechat } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { IoCall } from "react-icons/io5";
import Footer from '../Components/Common/Footer';

export default function ContactUs() {
    return (
        <div className='min-h-screen bg-richblack-900'>

            <div className='flex lg:flex-row flex-col gap-10 w-5/6 mx-auto text-white py-16'>
                <div className='p-10 bg-richblack-800 border-[1px] border-pure-greys-300 rounded-lg mx-auto text-white font-bold
                    flex flex-col gap-5 max-w-[500px] h-fit my-auto'>
                    <div className='flex gap-3 items-center'>
                        <AiFillWechat />
                        <div>
                            <h1 className='text-xl'>Chat with us</h1>
                            <p className='text-pure-greys-300 font-semibold'>Our friendly team is here to help.</p>
                        </div>   
                    </div>

                    <div className='flex gap-3 items-center'>
                        <TfiWorld/>
                        <div>
                            <h1 className='text-xl'>Visit us</h1>
                            <p className='text-pure-greys-300 font-semibold'>Come and say hello at our office HQ. Here is the location/ address</p>
                        </div>   
                    </div>

                    <div className='flex gap-3 items-center'>
                        <IoCall />
                        <div>
                            <h1 className='text-xl'>Call us</h1>
                            <p className='text-pure-greys-300 font-semibold'>Mon - Fri From 8am to 5pm. +123 456 7890</p>
                        </div>   
                    </div>
                </div>

                <div className='w-11/12 mx-auto'>
                    
                    <div className='mb-4'>
                        <h1 className='text-xl font-bold text-center text-white'>Got a Idea? We've got the skills. Let's team up</h1>
                        <p className='text-center text-[14px] text-pure-greys-300'>Tell us more about yourself and what you're got in mind.</p>
                    </div>
                    <ContactUsForm/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}
