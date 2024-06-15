import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

export default function RequirementsInput({ setValues, register, errors, getValues}) {

    const [list, set_list] = useState([]);
    const [data, set_data] = useState("");
    const {edit_course, course_details} = useSelector((state) => state.course);

    useEffect(() => {
        register('course_requirements', {
            validate: value => value?.length > 0
        });

        if(edit_course){
            set_list(course_details?.instructions)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Element({value, index}){
        return (
            <div className='flex gap-2'>
                <p>{value}</p>
                <button className='text-[10px] text-pure-greys-300' onClick={ (event) => {
                    event.preventDefault();
                    delete_requirement(index)
                }}>
                clear</button>
            </div>
        )
    }

    function handle_change(event){
        event.preventDefault();
        set_data(event.target?.value);
    }

    const add_requirement = (event) => {
        event.preventDefault();
        
        set_list(() => {
            const new_list = [...list, data?.trim()];
            setValues("course_requirements", new_list);
            return new_list;
        })
        set_data("");
    }

    const delete_requirement = (index) => {

        set_list(() => {
            const new_list = list.filter((value, i) => i !== index);
            setValues("course_requirements", new_list);
            return new_list;
        })
    }

    return (
        <div className='flex flex-col gap-2'>

            <label className="text-[16px]">Requirements/ Instructions <sup className="text-[#FF0000] ">*</sup></label>

            <div className="flex flex-col gap-1">
                <input type="text" name="requirement" 
                    value={data}
                    placeholder="Enter the Instructions and Requirements" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300"
                    onChange={handle_change}>
                </input>
            </div>

            <button className='text-yellow-300 font-bold text-start' onClick={add_requirement}>
                Add
            </button>

            <div>
                {
                    list?.map((value, index) => (
                        <Element value={value} key={index} index={index}/>
                    ))
                }
            </div>

            {errors.course_requirements && <span className='text-[#FF0000]'>Atleast One Requirement is Needed</span>}
        </div>
    )
}
