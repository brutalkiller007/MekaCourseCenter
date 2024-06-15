import React, { useEffect, useState } from 'react';
import { api_connector } from '../../../Services/apiConnector';
import toast from 'react-hot-toast';
import { categories } from '../../../Services/apis';
import { useForm } from 'react-hook-form';
import TagInput from './TagInput';
import { useDispatch, useSelector } from 'react-redux';
import ImageInput from './ImageInput';
import RequirementsInput from './RequirementsInput';
import { create_course } from '../../../Services/Service_Functions/Course';
import { update_course_details } from '../../../Services/Service_Functions/Course';
import { set_edit_course, set_step } from '../../../Slices/courseSlice';

export default function CourseInfoPage() {

    const {edit_course, course_details} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [category, set_category] = useState([]);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState : {errors}
    } = useForm();

    const get_catalog_list = async () => {
        try{
            const result = await api_connector("GET", categories.GET_CATEGORIES);
            set_category(result.data.categories);
        }
        catch(error){
            console.log("error");
            toast.error("COULD NOT FETCH ALL THE CATEGORIES LIST");
        }
    }

    useEffect(() => {
        get_catalog_list();
    }, []);

    useEffect(() => {
        console.log(course_details);
        if(edit_course){
            toast.success("PLEASE NOTE THAT IT MAY TAKE SOME TIME TO LOAD THE THUMBNAIL");
            setValue('course_name', course_details.course_name);
            setValue('course_description', course_details.course_description);
            setValue('tags', course_details.tag);
            setValue('price', course_details.price);
            setValue('category', course_details.category);
            setValue('course_benefits', course_details.what_you_will_learn);
            setValue('course_requirements', course_details.instructions);
            setValue("course_img", course_details.thumbnail);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function is_updated(data){

        if(data.course_name !== course_details.course_name)
            return true;

        if(data.course_description !== course_details.course_description)
            return true;

        if(JSON.stringify(data.tags) !== JSON.stringify(course_details.tag))
            return true;

        if(data.course_benefits !== course_details.what_you_will_learn)
            return true;

        if(data.price !== course_details.price)
            return true;

        if(data.course_img !== course_details.thumbnail)
            return true;

        if(data.category !== course_details.category)
            return true;

        if(JSON.stringify(data.course_requirements) !== JSON.stringify(course_details.instructions))
            return true;

        return false;
    }

    const on_submit = (data) => {

        const form_data = new FormData();
        form_data.append("token", token);
        if(edit_course){
            if(!is_updated(data)){
                toast.success("NO CHANGES ARE DONE TO EDIT");
                dispatch(set_edit_course(false));
                dispatch(set_step(2));
                return
            }
            console.log("abcd")
            form_data.append("course_id", course_details._id);

            if(data.course_name !== course_details.course_name)
                form_data.append("name", data.course_name);

            if(data.course_description !== course_details.course_description)
                form_data.append("course_description", data.course_description);

            if(data.tags !== course_details.tag)
                form_data.append("tags", JSON.stringify(data.tags));

            if(data.course_benefits !== course_details.what_you_will_learn)
                form_data.append("what_you_will_learn", data.course_benefits);

            if(data.price !== course_details.price)
                form_data.append("price", data.price);

            if(data.course_img !== course_details.thumbnail)
                form_data.append("thumbnail_image", data.course_img);

            if(data.category !== course_details.category)
                form_data.append("cat", data.category);

            if(data.course_requirements !== course_details.instructions)
                form_data.append("instructions", JSON.stringify(data.course_requirements));
            
            dispatch(update_course_details(form_data, token, course_details, true));

            return
        }

        form_data.append("name", data.course_name);
        form_data.append("course_description", data.course_description);
        form_data.append("what_you_will_learn", data.course_benefits);
        form_data.append("price", data.price);
        form_data.append("cat", data.category);
        form_data.append("instructions", JSON.stringify(data.course_requirements));
        form_data.append("tags", JSON.stringify(data.tags));
        form_data.append("thumbnail_image", data.course_img);

        if(edit_course){
            return
        }

        dispatch(create_course(form_data, token));
    }

    return (
        <form className='text-white' onSubmit={handleSubmit(on_submit)}>
            <div className='bg-richblack-800 md:p-5 p-2 flex flex-col gap-5'>
                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Course Title <sup className="text-[#FF0000] ">*</sup></label>
                    <input type="text" name="course_name" 
                        {...register('course_name', {required: true})}
                        placeholder="Enter Course title" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                    </input>
                    {errors.course_name && <p className='text-[#FF0000]'>Course Title is required.</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Course Description <sup className="text-[#FF0000] ">*</sup></label>
                    <textarea name="course_description" rows="5"
                        {...register('course_description', {required: true})}
                        placeholder="Enter Course Description" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                    </textarea>
                    {errors.course_description && <p className='text-[#FF0000]'>Course Description is required.</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Course Price <sup className="text-[#FF0000] ">*</sup></label>
                    <input type="number" name="price" 
                        {...register('price', 
                            {required:{
                                value: true,
                                message: "Course Price is Required"
                            }, 
                            pattern : {
                                value: /^[0-9]+$/,
                                message: "Only numbers are allowed",
                            }})}
                        placeholder="Enter Course Price" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                    </input>
                    
                    {errors.price && <p className='text-[#FF0000]'>{errors.price.message}</p>}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Course Category <sup className="text-[#FF0000] ">*</sup></label>
                    <select name="category"
                        defaultValue=""
                        {...register('category', {required: true})}
                        className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        <option value="" disabled>Select</option>
                        {
                            category?.map((value, index) => 
                                (<option value={value._id} key={index}>{value.name}</option>)
                            )
                        }
                    </select>
                    {errors.category && <p className='text-[#FF0000]'>Course Category is required.</p>}
                </div>

                <TagInput setValues={setValue} register={register} errors={errors} getValues={getValues}/>
                
                {/*IMAGE INPUT*/}
                
                <ImageInput setValue={setValue} register={register} errors={errors} getValues={getValues}/>

                <div className="flex flex-col gap-1">
                    <label className="text-[16px]">Course Benefits <sup className="text-[#FF0000] ">*</sup></label>
                    <textarea name="course_benefits" rows="5"
                        {...register('course_benefits', {required: true})}
                        placeholder="Enter Benefits of the Course" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                    </textarea>
                    {errors.course_benefits && <p className='text-[#FF0000]'>Course Benefits is required.</p>}
                </div>

                <RequirementsInput setValues={setValue} register={register} errors={errors} getValues={getValues}/>
                
                <div className='flex justify-end'>
                    <button className='px-3 py-2 text-black font-bold bg-yellow-100 rounded-md w-fit'>{edit_course ? "Save Changes" : "Next"}</button>
                </div>
                
            </div>
            
        </form>
    )
}
