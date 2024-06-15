import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/Service_Functions/Auth';
import { useDispatch } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";

export default function ProfileDropDown() { 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handle_logout(){
    dispatch(logout(navigate));
  }
    return (
        <div className='text-white group hover:cursor-pointer relative'>
            <FaChevronDown/>
            
            <div className='invisible group group-hover:visible absolute bg-richblack-700 p-2 translate-x-[-60%] translate-y-3
                transition-all duration-300 rounded-md'>
                <div className='flex gap-2 flex-col'>
                  <button className='px-3 py-2 hover:bg-richblack-800 rounded-md'
                    onClick={() => navigate("/dashboard/my_profile")}>
                    Dashboard</button>
                  <button className='px-3 py-2 hover:bg-richblack-800 rounded-md'
                    onClick={() => handle_logout()}>Log Out</button>
                </div>
            </div>
        </div>
    )
}
