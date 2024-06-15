import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { update_info } from '../../Services/Service_Functions/Setting';
import { useNavigate } from "react-router-dom";

const Gender = ["Select", "Male", "Female", "Others"]

export default function PersonalDetailsUpdate() {

    const {user_details} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, set_data] = useState({
        first_name : user_details.first_name,
        last_name : user_details.last_name,
        date_of_birth : user_details.additional_details.date_of_birth || "",
        about: user_details.additional_details.about || "",
        gender: user_details.additional_details.gender || "Select",
        contact_number: user_details.additional_details.contact_number || ""
    })

    function change_data(event){
        set_data((prev) => (
            {
                ...prev,
                [event.target.name] : event.target.value,
            }
        ))
        console.log(data);
    }

    function handle_submit(event){
        event.preventDefault();

        if(!data.first_name && !data.last_name && !data.date_of_birth && !data.contact_number && !data.about && data.gender !== "Select"){
            toast.error("DETAILS CAN NOT BE EMPTY TO UPDATE");
        }
        else{
            dispatch(update_info(data, token, navigate));
        }
    }
    return (
        
        <form onSubmit={handle_submit} className='flex flex-col gap-5'>
            <div className='bg-richblack-800 p-5'>
                <h1 className='text-xl font-bold mb-5'>Profile Information</h1>

                <div className='grid md:grid-cols-2 gap-3 gap-y-5'>
                    <div className="flex flex-col">
                        <label className="text-[16px]">First Name</label>
                        <input type="text" name="first_name" 
                            value = {data.first_name}
                            onChange={change_data}
                            placeholder="Enter first name" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">Last Name</label>
                        <input type="text" name="last_name" 
                            value = {data.last_name}
                            onChange={change_data}
                            placeholder="Enter last name" className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col text-white">
                        <label className="text-[16px]">Date of Birth</label>
                        <input type="date" name="date_of_birth" 
                            value = {data.date_of_birth}
                            onChange={change_data}
                            placeholder="Enter last name" className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col text-white">
                        <label className="text-[16px]">Gender</label>
                        <select name="gender" 
                            value = {data.gender}
                            onChange={change_data}
                            placeholder="Enter last name" className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                            {
                                Gender.map((option) => (
                                    <option value={option} key={option}>{option}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]"> Contact Number</label>
                        <input type="text" name="contact_number" 
                            value = {data.contact_number}
                            onChange={change_data}
                            placeholder="Enter Contact Number" className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[16px]">About</label>
                        <input type="text" name="about" 
                            value = {data.about}
                            onChange={change_data}
                            placeholder="Enter Bio Details" className="px-2 py-3 rounded-md w-full bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                    </div>
                </div>
            </div>

            <div className='flex justify-end gap-2 items-center'>
                <Link to="/dashboard/my_profile" className='py-2 px-3 bg-richblack-700 rounded-md font-bold' >
                    <button>Cancel</button>
                </Link>

                <button type='submit' className='py-2 px-3 bg-yellow-200 rounded-md text-black font-bold'>Save</button>
            </div>
        </form>
    )
}
