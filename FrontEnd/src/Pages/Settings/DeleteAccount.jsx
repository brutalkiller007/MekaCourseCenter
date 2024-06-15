import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { delete_account } from '../../Services/Service_Functions/Setting';

export default function DeleteAccount() {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handle_delete = (event) => {
        event.preventDefault();

        dispatch(delete_account(token, navigate));
    }
    return (
        <div className='bg-[#761e1e] p-5 rounded-md'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold'>Delete Account</h1>
                <RiDeleteBin6Line size={25}/>
            </div>

            <div className='my-2'>
                <p className='font-semibold'>Would you like to delete account?</p>
                <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.</p>
            </div>

            <button className='text-[#FF0000]' onClick={handle_delete}>I want to delete my account</button>
        </div>
    )
}
