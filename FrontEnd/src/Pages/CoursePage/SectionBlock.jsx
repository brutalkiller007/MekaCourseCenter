import React from 'react';
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";
import get_time from '../../Utility/Get_Time';

export default function SectionBlock({section}) {

    const [state, set_state] = useState("hidden");

    return (
        <div>
            <div className='flex justify-between bg-richblack-700 py-5 px-3 font-semibold'>
                <div className='flex gap-2 items-center'>
                    <button onClick={() => {
                        set_state("block");
                    }} className={`${state === "hidden" ? "block" : "hidden"} transition-all duration-200`}>
                        <FaAngleDown/>
                    </button>

                    <button onClick={() => {
                        set_state("hidden");
                    }} className={`${state === "block" ? "block" : "hidden"} transition-all duration-200`}>
                        <FaAngleUp />
                    </button>

                    <h1>{section.section_name}</h1>
                </div>

                <div className='text-yellow-100 '>
                    {section.sub_section.length} lecture(s)
                </div>
            </div>

            <div className={`${state} border-[1px] border-richblack-700 font-semibold transition-all duration-200`} >
                {
                    section.sub_section?.map((item, index) => (
                    <div className='flex justify-between bg-richblack-900 py-5 px-3' key={index}>
                        <div className='flex items-center gap-2'>
                            <CiVideoOn />
                            {item.title}
                        </div>

                        <p>{get_time(item.duration)}</p>
                    </div>))
                }
            </div>
        </div>
    )
}
