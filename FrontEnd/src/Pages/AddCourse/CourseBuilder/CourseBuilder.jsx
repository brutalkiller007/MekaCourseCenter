import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { create_section } from '../../../Services/Service_Functions/Course';
import SectionView from './SectionView';
import { update_section } from '../../../Services/Service_Functions/Course';
import { set_step, set_edit_course } from '../../../Slices/courseSlice';
import toast from 'react-hot-toast';

export default function CourseBuilder() {

    const {
        register,
        setValue,
        getValues,
        formState: {errors},
        handleSubmit,
    } = useForm();

    const dispatch = useDispatch();
    const [edit_section, set_edit_section] = useState(false);
    const [section_id, set_section_id] = useState("");
    const {course_details} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    const on_submit = () => {
        console.log(course_details);
        if(edit_section)
            dispatch(update_section(getValues("section_name"), section_id, course_details._id, token));
        else
            dispatch(create_section(getValues("section_name"), course_details._id, token));
    }

    const cancel_edit = (event) => {
        event.preventDefault();
        set_edit_section(false);
        set_section_id("");
        setValue("section_name", "");
    }

    const go_back = (event) => {
        event.preventDefault();
        dispatch(set_edit_course(true));
        dispatch(set_step(1));
    }

    const go_next = (event) => {
        event.preventDefault();
        if(course_details?.course_content?.length === 0){
            toast.error("ADD ATLEAST ONE SECTION")
            return
        }
        if(course_details?.course_content?.some((section) => section?.sub_section.length === 0)){
            toast.error("ADD ATLEAST ONE LECTURE IN EACH SUB-SECTION")
            return
        }

        dispatch(set_step(3));
    }

    const edit_section_fun = (section_name, sectionid) => {
        set_edit_section(true);
        set_section_id(sectionid);
        setValue("section_name", section_name);
    }

    return (
        <div className='text-white min-h-[100vh] w-full p-5 bg-richblack-800 rounded-lg'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl font-bold '>Course Builder</h1>
                
                {/**SECTION CREATION FORM */}
                <form onSubmit={handleSubmit(on_submit)}>
                    <div className='flex flex-col gap-3'>
                        <div className="flex flex-col gap-1">
                            <label className="text-[16px]">Course Title <sup className="text-[#FF0000] ">*</sup></label>

                            <input type="text" name="section_name" 
                                {...register('section_name', {required: {value : true, message: "Section Name is Required"}})}
                                placeholder="Enter Section Name" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                            </input>

                            {errors.section_name && <p className='text-[#FF0000]'>{errors.section_name.message}</p>}
                        </div>

                        <div className='flex gap-2'>
                            <button className='flex items-center gap-2 text-yellow-200 bg-richblack-900 w-fit px-3 py-2 rounded-md
                                                    font-bold border-2 border-yellow' type='submit'>
                                <p>{edit_section ? "Edit Section" : "Create Section"}</p>
                                <IoMdAddCircleOutline />
                            </button>

                            {edit_section && <button className='text-[10px] text-pure-greys-300 underline' onClick={cancel_edit}>Cancel Edit</button>}
                        </div>
                    </div>
                </form>

                <div>
                    {
                        course_details?.course_content?.length > 0 && (<SectionView edit_section_fun={edit_section_fun}/>)
                    }
                </div>

                <div className='flex gap-2 justify-end'>
                    <button className='px-3 py-2 bg-pure-greys-300 w-fit rounded-md text-black font-bold' onClick={go_back}>
                        Back
                    </button>

                    <button className='px-3 py-2 bg-yellow-200 w-fit rounded-md text-black font-bold flex items-center gap-1' onClick={go_next}>
                        <p>Next</p> <MdNavigateNext/>
                    </button>
                </div>
            </div>

        </div>
    )
}
