import React, { useEffect, useState} from 'react';
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';

export default function TagInput({ setValues, register, errors, getValues}) {

    const [tags, set_tags] = useState([]);
    const {edit_course, course_details} = useSelector((state) => state.course);

    useEffect(() => {
        register(`tags`, {
            validate: value => value?.length > 0
        });

        if(edit_course)
            set_tags(course_details?.tag);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Element({value, index}){
        return (
            <div className='rounded-md bg-yellow-5 px-2 w-fit text-black font-bold inline-block m-1'>
                <div className='flex items-center gap-2'>
                    <p className='text-10'>{value}</p>
                    <button onClick={(event) => {
                        event.preventDefault();
                        delete_tag(index);
                    }}><ImCross size={10} /></button>
                </div>
            </div>
        )
    }
    
    const delete_tag = (index) => {

        set_tags((prev) => {
            const new_tags = tags.filter((element, i) => i !== index);
            setValues('tags', new_tags);

            return new_tags;
        })
    }

    function handle_keydown(event){

        if(event.key !== "Enter" )
            return

        event.preventDefault();

        const value = event.target.value;

        if(!value.trim())
            return 

        set_tags((prev) => {
            const new_tags = [...prev, value];
            setValues('tags', new_tags);

            return new_tags;
        })
        event.target.value = "";
    }

    return (
        <div className='flex flex-col gap-2' >

            <label className="text-[16px]">Tags <sup className="text-[#FF0000] ">*</sup></label>

            <div className='h-auto w-full'>
                {
                    tags?.map((value, index) => (
                        <Element value={value} key={index} index={index}
                        />
                    ))
                }
            </div>

            <div className="flex flex-col gap-1">
                <input type="text" name="tag" 
                    placeholder="Enter the Tag Name and Click on Enter " className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300"
                    onKeyDown={handle_keydown}>
                </input>
            </div>
            
            {errors.tags && <span className='text-[#FF0000]'>Atleast One Tag is Required</span>}
        </div>
    )
}
