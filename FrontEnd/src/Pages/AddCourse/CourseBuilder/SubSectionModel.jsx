import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx";
import { LuUploadCloud } from "react-icons/lu";
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_sub_section, update_sub_section } from '../../../Services/Service_Functions/Course';
import toast from 'react-hot-toast';

export default function SubSectionModel({subsection_modal, close_fun}) {

    const {token} = useSelector((state) => state.auth);
    const {course_details} = useSelector((state) => state.course);

    const [video, set_video] = useState("");
    const dispatch = useDispatch();

    const { 
        register, 
        setValue,
        formState : {errors},
        handleSubmit} = useForm();

    const file_input_ref = useRef();

    const on_submit = (data) => {

        if(subsection_modal.type === "view"){
            close_fun();
            return
        }
        const form_data = new FormData();
        form_data.append("token", token);
        
        if(subsection_modal.type === "edit"){
            
            if(data.title === subsection_modal.title && data.description === subsection_modal.description && data.video === subsection_modal.video){
                toast("NO CHANGES ARE DONE TO EDIT");
                return
            }
            if(data.title !== subsection_modal.title)
                form_data.append("title", data.title);

            if(data.description !== subsection_modal.description)
                form_data.append("description", data.description);

            if(data.video !== subsection_modal.video)
                form_data.append("video_file", data.video);

            form_data.append("sub_section_id", subsection_modal.id);
            dispatch(update_sub_section(form_data, token, course_details, subsection_modal.section_id));
            close_fun();
            return;
        }

        form_data.append("title", data.title);
        form_data.append("description", data.description);
        form_data.append("video_file", data.video);
        form_data.append("section_id", subsection_modal.section_id);
        form_data.append("course_id", course_details._id);

        dispatch(create_sub_section(form_data, token, course_details));
        close_fun();
    }

    useEffect(() => {
        register("video", {
            required: {
                value: true,
                message: "Lecture Video is Mandatory"
            }
        });

        if(subsection_modal.type !== "add"){
            toast.error("PLEASE NOTE THAT VIDEO MIGHT TAKE SOME TIME TO LOAD")
            set_video(() => {
                setValue("video", subsection_modal.video);
                return subsection_modal.video;
            })
            setValue("title", subsection_modal.title);
            setValue("description", subsection_modal.description);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function handle_file_change(event){
        const files = event.target.files;

        if(files.length > 0){
            set_video(() => {
                setValue("video", files[0]);
                return URL.createObjectURL(files[0])
            })
        }
    }

    return (
        <div className='w-screen h-screen fixed inset-0 grid place-items-center bg-opacity-40 backdrop-blur-sm overflow-y-scroll'>

            <div className='bg-richblack-800 min-w-[300px] rounded-md md:w-[50%] w-[90%] h-fit'>
                <div className='bg-richblack-700 flex items-center justify-between p-3 mb-5'>

                    <h1 className='text-3xl font-bold '>{(subsection_modal.type === "view" && "View Lecture")
                                                        || (subsection_modal.type === "edit" && "Edit Lecture")
                                                        || (subsection_modal.type === "add" && "Add Lecture")}</h1>
                    <button onClick={(event) => {
                        event.preventDefault();
                        close_fun();
                    }}><RxCross2 size={30}  className="hover-pointer"/></button>
                
                </div>

                <form className='text-white px-5 flex flex-col gap-4' onSubmit={handleSubmit(on_submit)}>
                    <div className='flex flex-col gap-1'>
                        <label className="text-[16px]">Lecture Video <sup className="text-[#FF0000] ">*</sup></label>

                        <div className='px-5 py-2 bg-richblack-700 h-fit'>

                            <div className='h-fit mx-auto grid place-items-center'>
                                {
                                    video ? (<div>
                                                <video src={video} autoPlay loop className='min-w-[200px] max-w-[500px] mx-auto w-full h-36 lg:h-48'></video>

                                                {
                                                    subsection_modal.type !== "view" && (
                                                        <div className='grid place-items-center mt-2 text-[10px]'>
                                                            <button className='text-center' onClick={(event) => {event.preventDefault();
                                                                setValue("video", ""); set_video(null)}}
                                                            >Cancel</button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ) :

                                        (<div className='relative z-10 flex items-center justify-center flex-col h-36 lg:h-48'>
                                            <button className='bg-black p-2 rounded-[50%] aspect-square text-yellow-200'
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    file_input_ref.current.click()
                                                }}>
                                                <LuUploadCloud size={30}/>
                                            </button>
                                            
                                            <p>Click to Browse a file</p>

                                            <input type='file' className='hidden' accept='video/mp4' name='video' 
                                                ref={file_input_ref} onChange={handle_file_change}></input>
                                        </div>)
                                }
                            
                            </div>
                        </div>
                        {errors.video && <p className='text-[#FF0000] text-[12px]'>Lecture Video is required.</p>}
                    </div>

                    <div className='flex flex-col gap-1'>

                        <label className="text-[16px]">Lecture Title <sup className="text-[#FF0000] ">*</sup></label>

                        <input type="text" name="title" 
                            {...register('title', {required: true})}
                            placeholder="Enter Lecture title" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </input>
                        {errors.title && <p className='text-[#FF0000] text-[12px]'>Lecture Title is required.</p>}
                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="text-[16px]">Lecture Description <sup className="text-[#FF0000] ">*</sup></label>

                        <textarea name="description" rows="3"
                            {...register('description', {required: true})}
                            placeholder="Enter Lecture Description" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </textarea>

                        {errors.description && <p className='text-[#FF0000] text-[12px]'>Lecture Description is required.</p>}
                    </div>

                    <div className='flex justify-end mb-2'>
                        <button type='submit' className='px-3 py-2 w-fit bg-yellow-300 font-bold text-black rounded-md'>{(subsection_modal.type === "view" && "Close")
                                                                                                                || (subsection_modal.type === "edit" && "Edit Changes")
                                                                                                                || (subsection_modal.type === "add" && "Add")}</button>
                    </div>
                </form>


            </div>
        </div>
    )
}
