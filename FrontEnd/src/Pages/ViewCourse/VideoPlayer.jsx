import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../../Components/Common/Spinner';
import { BigPlayButton, Player } from 'video-react';
import { useRef } from 'react';
import "../../../node_modules/video-react/dist/video-react.css";
import { update_course_progress } from '../../Services/Service_Functions/DisplayCourses';
import { set_completed_videos } from '../../Slices/ViewCourseSlice';

export default function VideoPlayer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const video_player_ref = useRef()
    const {course_section_details, course_details, completed_videos } = useSelector((state) => state.view_course);
    const {token} = useSelector((state) => state.auth);
    const {course_id, section_id, sub_section_id} = useParams();
    const [video_data, set_video_data] = useState({});
    const [loading, set_loading] = useState(false);
    const [video_ended, set_video_ended] = useState(false);

    async function update_course_progress_fun(){
        set_loading(true);
        const result = await update_course_progress(course_id, sub_section_id, token);

        if(result.success){
            dispatch(set_completed_videos(result.completed_videos));
        }
        set_loading(false);
    }
    useEffect(() => {

        async function get_video_url(){
            set_loading(true);
                if(!course_section_details && !course_section_details.length)
                    return;

                if(!course_id || !section_id || !sub_section_id)
                    return;

                const filtered_section = course_section_details.find((item) => item._id === section_id);
                const filtered_sub_section = filtered_section?.sub_section.find((item) => item._id === sub_section_id);
                
                set_video_data(filtered_sub_section);
                set_video_ended(false);
            set_loading(false);
        }

        get_video_url()
        // eslint-disable-next-line
    }, [location.pathname, course_details, course_section_details])

    const is_first_video = () => {
        const first_video_id = course_section_details[0].sub_section[0]._id;

        if(first_video_id === sub_section_id){
            return true;
        }
        else
            return false;
    }

    const is_last_video = () => {
        const last_sub_section_length = course_section_details[course_section_details.length - 1].sub_section.length;
        const last_video_id = course_section_details[course_section_details.length - 1].sub_section[last_sub_section_length - 1]._id;

        if(last_video_id === sub_section_id){
            return true;
        }
        else
            return false;
    }

    const go_to_next_video = () => {
        const current_section_index = course_section_details.findIndex((item) => item._id === section_id);
        const sub_section_length = course_section_details[current_section_index].sub_section.length;
        const current_sub_section_index = course_section_details[current_section_index].sub_section.findIndex((item) => item._id === sub_section_id);

        let next_section, next_sub_section;
        if(current_sub_section_index === sub_section_length - 1){
            next_section = course_section_details[current_section_index + 1]._id;
            next_sub_section = course_section_details[current_section_index + 1].sub_section[0]._id;
        }
        else{
            next_section = section_id;
            next_sub_section = course_section_details[current_section_index].sub_section[current_sub_section_index + 1]._id;
        }

        navigate(`/view_course/${course_id}/section/${next_section}/sub_section/${next_sub_section}`);
    }

    const go_to_prev_video = () => {
        const current_section_index = course_section_details.findIndex((item) => item._id === section_id);
        const current_sub_section_index = course_section_details[current_section_index].sub_section.findIndex((item) => item._id === sub_section_id);

        let next_section, next_sub_section;
        if(current_sub_section_index === 0){
            next_section = course_section_details[current_section_index - 1]._id;
            const prev_sub_section_length = course_section_details[current_section_index - 1].sub_section.length;
            next_sub_section = course_section_details[current_section_index - 1].sub_section[prev_sub_section_length - 1]._id;
        }
        else{
            next_section = section_id;
            next_sub_section = course_section_details[current_section_index].sub_section[current_sub_section_index - 1]._id;
        }
        navigate(`/view_course/${course_id}/section/${next_section}/sub_section/${next_sub_section}`);
    }

    if(!video_data)
        return (<Spinner/>)
    return (
        <div className='text-white'>
            {
                video_data && (
                    < >
                        <div className='h-[cal(100vh-3.5rem)]'>
                            <Player ref={video_player_ref} src={video_data?.video_url} playsInline
                                onEnded={() => set_video_ended(true)}>
                                
                                <BigPlayButton position='center'/>

                                {
                                    video_ended && 
                                    <div className='absolute text-white z-20 inset-0 h-full bg-white bg-opacity-35 flex flex-col justify-center items-center gap-5'>
                                        {   
                                            !completed_videos.includes(sub_section_id) &&
                                            <button className='text-[18px] font-bold bg-yellow-300 px-3 py-2 text-black rounded-md w-fit'
                                                onClick={() => update_course_progress_fun()}>
                                            {
                                                loading ? "loading.." : "Mark Video as Read"
                                            }
                                            </button>
                                        }

                                        <button className='text-[18px] font-bold bg-yellow-300 px-3 py-2 text-black rounded-md w-fit'
                                            onClick={() => {
                                                video_player_ref?.current.seek(0);
                                                set_video_ended(false);
                                            }}>
                                            Rewatch
                                        </button>

                                        <div className='flex gap-5'>
                                            {
                                                !is_first_video() &&
                                                <button className='text-[18px] font-bold bg-yellow-300 px-3 py-2 text-black rounded-md w-fit'
                                                    onClick={() => go_to_prev_video()}>
                                                    Previous
                                                </button>
                                            }

                                            {
                                                !is_last_video() && 
                                                <button className='text-[18px] font-bold bg-yellow-300 px-3 py-2 text-black rounded-md w-fit'
                                                    onClick={() => go_to_next_video()}>
                                                    Next
                                                </button>
                                            }
                                        </div>
                                    </div>
                                }
                            </Player>
                        </div>

                        <h1 className='text-2xl font-semibold m-3 my-1'>{video_data.title}</h1>
                        <p className='text-xl text-pure-greys-300 mx-3'>{video_data.description}</p>
                    </>
                )
            }
        </div>
    )
}
