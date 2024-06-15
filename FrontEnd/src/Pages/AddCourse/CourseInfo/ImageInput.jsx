import React, { useEffect } from 'react'
import { useState } from 'react';
import { LuUploadCloud } from "react-icons/lu";
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function ImageInput({setValue, getValues, register, errors}) {

    const [image, set_image] = useState();
    const file_input_ref = useRef();
    const {edit_course, course_details} = useSelector((state) => state.course);

    useEffect(() => {
        register("course_img", {
            required: {
                value: true,
                message: "Course Image is Mandatory"
            }
        })

        if(edit_course)
            set_image(course_details.thumbnail);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ])

    function handle_file_change(event){
        const files = event.target.files;

        if(files.length > 0){
            set_image(() => {
                setValue("course_img", files[0]);
                return URL.createObjectURL(files[0])
            })
        }
    }

    return (
        <div className='flex flex-col gap-1 relative'>
            <label className="text-[16px] relative">Course Thumbnail <sup className="text-[#FF0000] ">*</sup></label>

            <div className='h-60'>
                <input type='image' src={image} alt='' className='absolute w-full h-60 bg-richblack-700 object-cover'></input>
                <div className='relative z-10 flex items-center h-full justify-center flex-col'>
                    <button className='bg-black p-2 rounded-[50%] aspect-square text-yellow-200'
                                onClick={(event) => {
                                    event.preventDefault();
                                    file_input_ref.current.click()
                                }}>
                        <LuUploadCloud size={30}/>
                    </button>
                    <p>Click to Browse a file</p>
                    <input type='file' className='hidden' accept='image/jpeg , image/png' name='thumbnail' 
                            ref={file_input_ref} onChange={handle_file_change}></input>
                </div>
            </div>

            {errors.course_img && <span className='text-[#FF0000]'>{errors.course_img.message}</span>}
        </div>
    )
}
