import React from 'react'
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { add_rating_and_review } from '../../Services/Service_Functions/DisplayCourses';

export default function ReviewModal({close_fun}) {

    const { register, setValue, handleSubmit, formState: {errors}} = useForm() 
    const {user_details} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {course_details} = useSelector((state) => state.view_course);

    useEffect(() => {
      setValue("review", "")
      setValue("rating", 0)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handle_change = (new_rating) => {
      setValue('rating', new_rating);
    }
    const on_submit = async (data, event) => {
        event.preventDefault();
        await add_rating_and_review(course_details._id, data.rating, data.review, token);
        close_fun();
    }

    return (
        <div className='fixed bg-white inset-0 bg-opacity-40 place-items-center grid z-[1000] min-h-screen text-white'>
            <div className='bg-richblack-900 w-11/12 md:w-1/2 lg:w-2/5 rounded-md'>
                <div className='text-2xl text-white flex justify-between p-4 bg-richblack-700 rounded-md'>
                  <h1 className='font-bold'>Add Review</h1>
                  <button onClick={close_fun}>X</button>
                </div>

                <div className='bg-richblack-900 my-4'>
                  <div className='w-full flex justify-center items-center gap-2'>
                    <img src={user_details.image} className='w-[60px] aspect-square object-cover rounded-[50%]' alt=''></img>

                    <div className='flex flex-col'>
                      <p className='text-xl font-bold'>{user_details.first_name} {user_details.last_name}</p>
                      <p>Posting Publicly</p>
                    </div>
                  </div>

                  <form className='p-6 flex flex-col gap-3' onSubmit={handleSubmit(on_submit)}>
                      <div className='flex justify-center'>
                          <ReactStars
                            count={5}
                            size={30}
                            activeColor="#ffd700"
                            onChange={handle_change}
                        />
                      </div>

                      <div className="flex flex-col gap-1">

                        <label className="text-[16px]">Add Your Experience <sup className="text-[#FF0000] ">*</sup></label>

                        <textarea name="review" rows="3"
                            {...register('review', {required: true})}
                            placeholder="Add Your Experience" className="px-2 py-3 rounded-md w-full  bg-richblack-700 border-b-[1px] border-pure-greys-300">
                        </textarea>

                        {errors.review && <p className='text-[#FF0000] text-[14px]'>Your Experience is Mandatory.</p>}
                    </div>
                    
                    <div className='flex justify-end gap-2'>
                      <button type='button' className='px-3 py-2 rounded-md font-bold text-black bg-pure-greys-300'
                        onClick={close_fun}>
                          Cancel
                      </button>

                      <button type='submit' className='px-3 py-2 rounded-md font-bold text-black bg-yellow-300'>
                          Save
                      </button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    )
}
