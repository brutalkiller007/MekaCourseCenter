import React from 'react'
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Edit(){
    return (
        <Link className='flex items-center bg-yellow-100 text-black p-2 rounded-md gap-2 w-fit h-fit' to={"/dashboard/settings"}>
            <p>Edit</p>
            <FaEdit />
        </Link>
    )
}

function Detail({heading, data}){
    return (
        <div>
            <h3 className='text-pure-greys-300'>{heading}</h3>
            <p className='font-bold'>{ data ? data : `Add ${heading}`}</p>
        </div>
    )
}

export default function MyProfile() {

    const {user_details} = useSelector((state) => state.profile);
    console.log(user_details);

    return (
        <div className='text-white flex flex-col gap-10'>
            <h1 className='text-4xl font-bold text-center'>My Profile</h1>

            <div className='bg-richblack-800 p-5 rounded-md flex items-center gap-3 md:flex-row flex-col-reverse justify-between'>
            
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <img src={user_details.image} alt='' className='w-16 rounded-[50%] aspect-square object-cover'></img>

                    <div className='flex flex-col text-center md:text-start'>
                        <p className='font-bold text-xl'>{user_details.first_name} {user_details.last_name}</p>
                        <p className=' text-pure-greys-300'>{user_details.email}</p>
                    </div>
                </div>

                <Edit/>
            </div>

            <div className='p-5 bg-richblack-800 rounded-md'>

                <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-xl'>About</h3>
                    <Edit/>
                </div>

                <p className=' text-pure-greys-300 mt-2'>
                    {
                        user_details?.additional_details.about ? user_details.additional_details.about : "Write Something About Yourself"
                    }
                </p>

            </div>

            <div className='p-5 bg-richblack-800 rounded-md'>
                <div className='flex justify-between items-center'>
                    <h3 className='font-bold text-xl'>Personal Details</h3>
                    <Edit/>
                </div>

                <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    <Detail heading="First Name" data={user_details.first_name}/>
                    <Detail heading="Last Name" data={user_details.last_name}/>
                    <Detail heading="Email" data={user_details.email}/>
                    <Detail heading="Contact Number" data={user_details.contact_number}/>
                    <Detail heading="Gender" data={user_details?.additional_details.gender}/>
                    <Detail heading="Date of Birth" data={user_details?.additional_details.date_of_birth}/>
                </div>
            </div>
        </div>

    )
}
