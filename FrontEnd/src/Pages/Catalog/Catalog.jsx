import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { api_connector } from '../../Services/apiConnector';
import { categories } from '../../Services/apis';
import toast from 'react-hot-toast';
import { get_page } from '../../Services/Service_Functions/DisplayCourses';
import CourseSlider from './CourseSlider';
import Footer from '../../Components/Common/Footer';

export default function Catalog() {

    const {category_name} = useParams();
    const [category_id, set_category_id] = useState(null);
    const [popular, set_popular] = useState([]);
    const [latest, set_latest] = useState([])
    const [page_details, set_page_details] = useState(null);
    const [state, set_state] = useState("popular");

    const get_course_id = async () => {
        const toast_id = toast.loading("LOADING.....");
        try{
            const all_categories = await api_connector("GET", categories.GET_CATEGORIES, {});

            const id = all_categories?.data?.categories?.filter((cat) => cat.name.split(" ").join("_").toLowerCase() === category_name)[0]._id;
            set_category_id(id);
        }
        catch(error){
            toast.error("ERROR OCCURED WHILE FETCHING THE CATEGORY DETAILS");
        }
        toast.dismiss(toast_id);
    }

    const get_page_details = async () => {
        if(!category_id)
            return;
        const toast_id = toast.loading("LOADING.....");
        try{
            const result = await get_page(category_id);
            console.log(result);
            if(result.success){
                const new_popular = result?.selected_category?.courses?.sort((a, b) => (b.students_enrolled.length - a.students_enrolled.length));
                set_popular(new_popular);

                const new_latest = new_popular?.sort((a, b) => (new Date(b.created_at) - new Date(a.created_at)));
                set_latest(new_latest);
                set_page_details(result);
            }
            else{
                throw new Error()
            }
        }
        catch(error){
            toast.error("ERROR OCCURED WHILE FETCHING PAGE DETAILS");
        }
        toast.dismiss(toast_id);
    }

    useEffect(() => {
        get_course_id();
        // eslint-disable-next-line
    }, [category_name]);

    useEffect(() => {
        get_page_details();
         // eslint-disable-next-line
    }, [category_id]);

    return (
        <div className='bg-richblack-900 min-h-screen'>
            {
                page_details && (
                    <div className='gap-10 flex flex-col'>
                        
                        <div className='bg-richblack-800'>
                            <div className='text-white lg:w-3/4 w-11/12 mx-auto my-14 flex flex-col gap-3'>
                                <p className='text-xl'>Home / Catalog / <span className='text-yellow-50'>{page_details?.selected_category?.name}</span> </p>
                                <p className='text-3xl font-semibold'>{page_details?.selected_category?.name}</p>
                                <p className='text-pure-greys-300 text-xl'>{page_details?.selected_category?.description}</p>
                            </div>
                        </div>

                        <div className="lg:w-3/4 w-11/12 mx-auto">
                            <div className='text-white'>
                                <h1 className='text-3xl font-bold text-white p-2'>Courses to get you started</h1>

                                <div className='border-b-[1px] border-pure-greys-300'>

                                    <button className={`px-3 py-2 ${state === "popular" && `text-yellow-50 border-b-[1px] border-yellow-50`} transition-all duration-200`} onClick={() => {
                                        if(state === "latest")
                                            set_state("popular");
                                    }}>
                                        Most Popular
                                    </button>

                                    <button className={`px-3 py-2 ${state === "latest" && `text-yellow-50 border-b-[1px] border-yellow-50`} transition-all duration-200`} onClick={() => {
                                        if(state === "popular")
                                            set_state("latest");
                                    }}>
                                        New
                                    </button>
                                </div>
                                
                                <div className={`${state === "popular" ? "hidden" : ""}`}>
                                    <CourseSlider courses={latest} />
                                </div>

                                <div className={`${state === "latest" ? "hidden" : ""}`}>
                                    <CourseSlider courses={popular} />
                                </div>
                                
                            </div>
                        </div>

                        <div className="lg:w-3/4 w-11/12 mx-auto">
                            <div>
                                <h1 className='text-3xl font-bold text-white p-2 border-b-[1px] border-pure-greys-300'>Top Courses in {page_details.different_category.name}</h1>

                                <CourseSlider courses={page_details.different_category.courses}/>
                            </div>
                        </div>
                        
                        <div className="lg:w-3/4 w-11/12 mx-auto">
                            <div>
                                <h1 className='text-3xl font-bold text-white p-2'>Top 10 Most Popular Courses</h1>

                                <div className='border-b-[1px] border-pure-greys-300'>

                                </div>

                                <CourseSlider courses={page_details.top_courses}/>
                            </div>
                        </div>

                    </div>
                )
            }

            <Footer/>
        </div>
    )
}
