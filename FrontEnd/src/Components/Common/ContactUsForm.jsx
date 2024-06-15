import React from 'react'
import { useForm } from 'react-hook-form';
import { api_connector } from '../../Services/apiConnector';
import { contact_us } from '../../Services/apis';
import toast from 'react-hot-toast';

export default function ContactUsForm() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const on_submit = async (data) => {
        const toast_id = toast.loading("SENDING MAIL....");

        try{
            const response = await api_connector("POST", contact_us.CONTACT_US, data);

            if(!response.data.success)
                throw new Error(response.data.message);

            toast.dismiss(toast_id);
            toast.success(response.data.message);
        }
        catch(error){
            toast.dismiss(toast_id);
            toast.error(error.response.data.message || "ERROR OCCURED WHILE SENDING THE MESSAGE");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(on_submit)} className='max-w-[450px] w-full flex flex-col gap-4 mx-auto'>
                
                <div className='flex gap-5'>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[16px]">First Name </label>
                        <input type="text" name="first_name" 
                            {...register('first_name', {required: true})}
                            placeholder="Enter First Name" className="px-2 py-2 rounded-md w-full  bg-richblack-800">
                        </input>
                        {errors.first_name && <p className='text-[#FF0000] text-[15px]'>Please enter your first name.</p>}
                    </div>

                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[16px]">Last Name </label>
                        <input type="text" name="last_name" 
                            {...register('last_name', {required: true})}
                            placeholder="Enter Last Name" className="px-2 py-2 rounded-md w-full  bg-richblack-800">
                        </input>
                        {errors.last_name && <p className='text-[#FF0000] text-[15px]'>Please enter your last name.</p>}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Email Address </label>
                    <input type="email" name="email" 
                        {...register('email', {required: true})}
                        placeholder="Enter Email Address" className="px-2 py-2 rounded-md w-full  bg-richblack-800">
                    </input>
                    {errors.last_name && <p className='text-[#FF0000] text-[15px]'>Please enter your Email.</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Phone Number </label>
                    <input type="number" name="phone_number" 
                        {...register('phone_number', {
                            required: {value: true, message: "Please enter your mobile number."},
                            maxLength: {value: 12, message: "Invalid Number!!!"},
                            minLength: {value: 10, message: "Invalid Number!!!"}
                        })}
                         placeholder="Enter Phone Number" className="px-2 py-2 rounded-md w-full  bg-richblack-800">
                    </input>
                    {errors.phone_number && <p className='text-[#FF0000] text-[15px]'>{errors.phone_number.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Message </label>
                    <textarea name="message" rows="6"
                        {...register('message', {required: true})}
                        placeholder="Enter Your Message" className="px-2 py-2 rounded-md w-full  bg-richblack-800">
                    </textarea>
                    {errors.message && <p className='text-[#FF0000] text-[15px]'>Please enter your Message.</p>}
                </div>

                <button type='submit' className='py-2 bg-yellow-100 font-bold text-black rounded-md w-full'>
                    Send Message
                </button>
            </form>
        </>
    )
}
