import React, { useState } from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { SiTicktick } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationModel from "../../Components/Common/ConfirmationModel";
import { set_loading } from '../../Slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { delete_course } from '../../Services/Service_Functions/DisplayCourses';
import { useNavigate } from 'react-router-dom';
import { convertToReadableDate } from '../../Utility/Change_date';

function Published(){
    return(<div className='text-yellow-300 flex items-center gap-1 w-fit font-bold px-3 bg-pure-greys-600 rounded-lg'>
        <SiTicktick size={12}/>
        <p>Published</p>
    </div>)
}

function Draft(){
    return(<div className='text-[#f25151] flex items-center gap-1 w-fit font-bold px-3 bg-pure-greys-600 rounded-lg'>
        <IoMdTime size={16} />
        <p>Draft</p>
    </div>)
}
export default function CourseTable({all_courses, set_all_courses}) {

    const [confirmation_model, set_confirmation_model] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function delete_course_fun(course_id){

        dispatch(set_loading(true));
        const result = await delete_course(course_id, token);
        if(!result){
            dispatch(set_loading(false));
            return;
        }
        
        set_all_courses(all_courses.filter(item => item._id !== course_id))
        dispatch(set_loading(false));
        set_confirmation_model(null);
    }
    return (

        <div>
            {
                all_courses.length === 0 ? (<div className='text-2xl text-center text-pure-greys-300'>
                    You have not created any courses yet.
                </div>) : 

                (<div className=''>
                    <div className='hidden md:block'>
                        <header className='grid grid-cols-9 p-3'>
                            <h1 className='col-span-6 text-center'>COURSE</h1>
                            <h1 className='text-center'>LECTURES</h1>
                            <h1 className='text-center'>PRICE</h1>
                            <h1 className='text-center'>OPTIONS</h1>      
                        </header>
                    </div>
                
                    <div className='flex gap-y-6 flex-col'>
                    {
                        all_courses.map((item, index) => (
                            <div className='grid grid-cols-10 md:grid-cols-9 p-3 rounded-md bg-richblack-800 gap-2' key={index}>

                                <h1 className='text-start col-span-3 md:hidden text-pure-greys-300 font-bold'>COURSE</h1>
                                <div className='md:col-span-6 col-span-7'>
                                    <div className='w-fit mx-auto flex flex-col md:flex-row gap-2'>
                                        <img src={item.thumbnail} alt='' className='min-w-[200px] min-h-[150px] md:w-1/2  object-cover'></img>
                                        <div className='flex flex-col justify-around'>
                                            <h2 className='text-[18px] font-bold'>{item.course_name}</h2>
                                            <p className="text-pure-greys-300">{item.course_description.substring(0, 20)}{item.course_description.length > 20 && "..."}</p>
                                            <div className='text-[13px]'>Created: {convertToReadableDate(item.created_at)}</div>
                                            <div>{item.status === "Published" ? <Published/> : <Draft/>}</div>
                                        </div>
                                    </div>
                                </div>

                                <h1 className='text-start col-span-3 md:hidden text-pure-greys-300 font-bold'>LECTURES</h1>
                                <div className='grid place-items-center col-span-7 md:col-span-1'>
                                    {item.total_lectures}
                                </div>

                                <h1 className='text-start col-span-3 md:hidden text-pure-greys-300 font-bold'>PRICE</h1>
                                <div className='place-items-center grid col-span-7 md:col-span-1'>
                                    <div className=' flex items-center'>
                                        <LiaRupeeSignSolid />
                                        {item.price}
                                    </div>
                                </div>

                                <h1 className='text-start col-span-3 md:hidden text-pure-greys-300 font-bold'>OPTIONS</h1>
                                <div className='grid place-items-center col-span-7 md:col-span-1'>
                                    <div className='flex gap-3 text-pure-greys-300'>

                                        <button onClick={() =>{
                                            navigate(`/dashboard/edit_course/${item._id}`)
                                        }}>
                                            <MdOutlineModeEdit size={20}/>
                                        </button>

                                        <button onClick={() => {
                                            set_confirmation_model({
                                                data_1 : "DELETE COURSE ???",
                                                data_2 : "All the data related to the course will be deleted ",
                                                btn1_text : "Delete",
                                                btn2_text : "Cancel",
                                                btn1_fun : () => delete_course_fun(item._id),
                                                btn2_fun : () => set_confirmation_model(null),
                                            })
                                        }}>
                                            <RiDeleteBinLine size={20}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
            </div>)

            }
            { confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>}
        </div>
    )
}
