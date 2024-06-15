import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { delete_section, delete_sub_section } from '../../../Services/Service_Functions/Course';
import { FaPlus } from "react-icons/fa";
import ConfirmationModel from '../../../Components/Common/ConfirmationModel';
import SubSectionModel from './SubSectionModel';

export default function SectionView({edit_section_fun}) {

    const dispatch = useDispatch();
    const {course_details} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [subsection_model, set_subsection_model] = useState(null);

    const initial_state = course_details?.course_content?.map(() => "hidden");
    const [show_subsection, set_show_subsection] = useState(initial_state);
    const [confirmation_model, set_confirmation_model] = useState(null);

    const delete_section_fun = (section_id) => {
        dispatch(delete_section(section_id, course_details._id, token));
        set_confirmation_model(null);
    }

    const close_lecture_fun = () => {
        set_subsection_model(null);
    }

    const delete_subsection_fun = ( sub_section_id ,section_id) => {
        dispatch(delete_sub_section(sub_section_id, section_id, token, course_details));
        set_confirmation_model(null);
    }

    const SubSectionElement = ({sub_section, section_id}) => {
        return (<div className='flex justify-between py-1 border-b-2 border-pure-greys-300'>
            <button className='flex gap-x-3' onClick={() => {
                set_subsection_model({
                    type: "view",
                    id: sub_section._id,
                    title: sub_section.title,
                    description: sub_section.description,
                    video: sub_section.video_url,
                    section_id: section_id
                })
            }}>
                <RxDropdownMenu size={25}/>
                <p>{sub_section.title}</p>
            </button>

            <div className='flex gap-3 text-pure-greys-300'>
                <button onClick={() => {
                    set_subsection_model({
                        type: "edit",
                        id: sub_section._id,
                        title: sub_section.title,
                        description: sub_section.description,
                        video: sub_section.video_url,
                        section_id: section_id
                    })
                }}><MdModeEdit /></button>


                <button onClick={() => {
                                    set_confirmation_model({
                                    data_1: "DELETE SUB SECTION ???",
                                    data_2: "All the data regarding the Sub-Section will be lost",
                                    btn1_text: "Delete",
                                    btn2_text: 'Cancel',
                                    btn1_fun: () => delete_subsection_fun(sub_section._id, section_id),
                                    btn2_fun: () => set_confirmation_model(null)
                                })                   
                    
                }}><RiDeleteBin6Line /></button>
            </div>
        </div>)
    }

    return (
        <div className='flex flex-col bg-richblack-700 p-3 rounded-md gap-4'>
            {
                course_details?.course_content?.map((item, index) => (
                    <div key={index}>
                        <div className='flex items-center justify-between border-b-2 border-pure-greys-300 py-1'>
                            <div className='flex gap-x-3'>
                                <RxDropdownMenu size={25}/>
                                <p>{item.section_name}</p>
                            </div>

                            <div className='flex gap-3 text-pure-greys-300'>
                                <button onClick={
                                    (event) => {event.preventDefault();
                                            edit_section_fun(item.section_name, item._id);
                                        }
                                }><MdModeEdit /></button>
                                <button onClick={
                                    (event) => {event.preventDefault();
                                            set_confirmation_model({
                                                data_1: "DELETE SECTION ???",
                                                data_2: "All the data regarding the Section will be lost",
                                                btn1_text: "Delete",
                                                btn2_text: 'Cancel',
                                                btn1_fun: () => delete_section_fun(item._id),
                                                btn2_fun: () => set_confirmation_model(null)
                                            })
                                    }
                                }><RiDeleteBin6Line /></button>
                                <div className='border-r-2 border-pure-greys-300'></div>

                                <button onClick={() => {
                                    set_show_subsection(() => {
                                        let new_states = [...show_subsection];
                                        new_states[index] = new_states[index] === "hidden" ? "block" : "hidden";
                                        return new_states;
                                    }) 
                                }}><MdOutlineArrowDropDown /></button>
                            </div>
                        </div>

                        <div className={`w-[90%] flex flex-col gap-3 mx-auto mt-2 ${show_subsection[index]}`}>
                            {
                                item?.sub_section?.map((sub_section, ind) => (
                                    <SubSectionElement sub_section={sub_section} section_id={item._id} key={ind}/>
                                ))
                            }

                            <button className='text-yellow-300 font-bold text-[14px] flex gap-1 items-center' onClick={() => 
                                                                                                    set_subsection_model({type: "add",
                                                                                                                        section_id: item._id})}>
                                <FaPlus /> 
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </div>
                ))
            }

           {subsection_model && <SubSectionModel subsection_modal={subsection_model} close_fun={close_lecture_fun}/>}
           {confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>}
        </div>
    )
}
