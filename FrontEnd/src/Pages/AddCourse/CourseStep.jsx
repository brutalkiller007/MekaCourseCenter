import React from 'react';
import { FaCheck } from "react-icons/fa"
import CourseInfoPage from './CourseInfo/CourseInfoPage';
import { useSelector } from 'react-redux';
import CourseBuilder from "./CourseBuilder/CourseBuilder";
import { PublishCourse } from './PublishCourse';

const steps = [
    {
        id : 1,
        title: "Course Info"
    },
    {
        id : 2,
        title: "Course Builder"
    },
    {
        id : 3,
        title: "Publish"
    }
]

export default function CourseStep() {

    const {step} = useSelector((state) => state.course);
    
    return (
        <div>
             
            <div className='w-[90%] mx-auto'>
                <div className='flex justify-center items-center w-full'>
                    {
                        steps.map((value) => (
                            <React.Fragment key={value.id}>
                                <div className={` w-10 aspect-square rounded-[50%] grid place-items-center border-2 font-bold
                                                ${value.id === step ? "border-yellow-300 text-yellow-300 bg-[#8B4513]" : "bg-richblack-800 border-pure-greys-300 text-pure-greys-300"}
                                                ${value.id < step ? "bg-yellow-300 border-yellow-300" : ""} `}>
                                    {
                                        (value.id < step) ? (<FaCheck color='black'/>) : value.id
                                    }
                                </div>

                                {
                                    value.id < 3 ? (<div className={`border-t-2 border-dashed w-[50%]
                                    ${value.id < step ? "border-yellow-300" : "border-richblack-700"}`}></div>) 
                                    : 
                                    (<div className='hidden'></div>)
                                }
                            </React.Fragment>
                        ))
                    }
                </div>

                <div className='flex justify-between mb-10 w-full'>
                    {
                        steps.map((value) => (
                            <p key={value.id}>{value.title}</p>
                        ))
                    }
                </div>
            </div>

            {
                (step === 1 && <CourseInfoPage/>)
                
            }
            {
                (step === 2 && <CourseBuilder/>)
            }
            {
                (step === 3 && <PublishCourse/>)
            }
        </div>
    )
}
