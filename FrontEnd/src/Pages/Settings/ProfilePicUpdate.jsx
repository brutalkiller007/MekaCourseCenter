import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRef } from 'react';
import { useState } from 'react';
import { update_dp } from '../../Services/Service_Functions/Setting';
import { FiUpload } from "react-icons/fi"

export default function ProfilePicUpdate() {
    
    const {user_details} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const file_input_ref = useRef();
    const [loading, set_loading] = useState(false);
    const [img_file, set_img_file] = useState(null);
    const [preview_img, set_preview_img] = useState(user_details.image);
    const dispatch = useDispatch();

    function handle_filechange(event){
        const file = event.target?.files[0];

        if(file){
            set_img_file(file);
            preview_file(file);
        }
    }

    const preview_file = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            set_preview_img(reader.result);
        }
    }

    function handle_click(){
        file_input_ref.current.click();
    }

    const handle_file_upload = () => {
        try{
            set_loading(true);
            const form_data = new FormData()
            form_data.append("display_picture", img_file);
            form_data.append("token", token);
            dispatch(update_dp(form_data, token))
        }
        catch(error){

        }
        finally{
            set_loading(false);
        }
    }
    
    return (
        <div className='bg-richblack-800 p-8 rounded-md flex gap-3 items-center flex-col md:flex-row'>
            <img src={preview_img} alt='' className=' w-20 rounded-[50%] aspect-square object-cover'></img>

            <div className='flex flex-col gap-3 '>
                <h1 className='font-bold text-center'>Change Profile Picture</h1>

                <input type='file' accept='image/png, image/jpeg' className='hidden'
                        ref={file_input_ref} onChange={handle_filechange}
                />

                <div className='flex gap-3'>
                    <button className='px-4 py-2 w-fit bg-richblack-600 rounded-md font-bold' onClick={handle_click}>Select</button>

                    <button className='px-3 py-2 bg-yellow-200 rounded-md text-black font-bold flex items-center gap-2' onClick={handle_file_upload}>
                        <p>
                            {
                                loading ? "Uploading" : "Upload"
                            }
                        </p>
                        <FiUpload/>
                    </button>
                </div>
            </div>

            
        </div>
    )
}
