import React from 'react'
import { HiOutlineViewList } from "react-icons/hi";
import { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, matchPath, useNavigate } from 'react-router-dom';
import { NavbarLinks } from '../../Data/navbar-links';
import { sidebarLinks } from '../../Data/dashboard-links';
import SideBarButton from '../Common/SideBar/SideBarButton';
import { IoExitOutline } from "react-icons/io5";
import { logout } from '../../Services/Service_Functions/Auth';
import { FaAngleDown } from "react-icons/fa6";
import ConfirmationModel from '../Common/ConfirmationModel';

export default function MiniSideBar({catalog}) {

    const [state, set_state] = useState(false);
    const {user_details} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const location = new useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const route_check = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const [confirmation_model, set_confirmation_model] = useState(null);

    return (
        <div>
        
            <button onClick={() => set_state(true)} className='text-pure-greys-300'>
                <HiOutlineViewList size={30}/>
            </button>

            <div className={`absolute inset-0 border-r-2 border-b-2 rounded-md  border-richblack-700 min-h-screen
                 h-[100vh] max-w-[350px] w-[300px] bg-richblack-800 py-3 text-pure-greys-300
                 ${state ? "translate-x-0" : "-translate-x-full"} transition-all duration-400 ease-in z-50 overflow-y-scroll`}>

                <button onClick={() => set_state(false)} className='ml-3 mb-3'>
                    <RxCross1 size={30}/>
                </button>

                <div className='flex flex-col text-xl gap-2'>
                    <div className='flex flex-col gap-2 border-b-2 border-richblack-600 pb-5'>
                        {   
                            token === null &&
                            <Link to={"/login"} onClick={() =>{
                                set_state(false);
                            }} className={`${route_check("/login") && "text-yellow-200 bg-[#8B4513]"} flex text-pure-greys-300 gap-6`}>

                                <span className={`${route_check("/login") && "bg-yellow-200"} w-[5px]`}></span>
                                <div className='w-full py-2 px-4 text-start font-bold'>
                                    Log In 
                                </div>
                            </Link>
                        }
                        {   
                            token === null &&
                            <Link to={"/signup"} onClick={() =>{
                                set_state(false);
                            }} className={`${route_check("/signup") && "text-yellow-200 bg-[#8B4513]"} flex text-pure-greys-300 gap-6`}>

                                <span className={`${route_check("/signup") && "bg-yellow-200"} w-[5px]`}></span>
                                <div className='w-full p-2 px-4 text-start font-bold'>
                                    Sign Up
                                </div>
                            </Link>
                        }

                        {
                            user_details !== null &&
                            <div className='flex flex-col gap-2 pl-3'>
                                <div className='flex items-center gap-3'>
                                    <img src={user_details.image} alt='' className='object-cover w-[75px] aspect-square rounded-[50%]'></img>

                                    <p className='text-white text-xl'>{user_details.first_name} {user_details.last_name}</p>
                                </div>
                                <p>{user_details.email}</p>
                            </div>
                        }
                    </div>

                    <div className='flex flex-col gap-1 py-2 border-b-2 border-richblack-600'>
                        {
                        NavbarLinks.map((item, index) => (
                            <div key={index}>
                                {   
                                    item.path &&
                                    <Link to={item?.path} onClick={() =>{
                                        set_state(false);
                                            }} className={`${route_check(item?.path) && "text-yellow-200 bg-[#8B4513]"} flex text-pure-greys-300 gap-6`}>

                                        <span className={`${route_check(item?.path) && "bg-yellow-200"} w-[5px]`}></span>
                                        <div className='w-full p-2 px-4 text-start font-bold'>
                                            {item.title}
                                        </div>
                                    </Link>
                                }

                                {
                                    !item.path && 
                                    <div className='flex items-center gap-1 group relative font-bold px-11'>
                                        {item.title}
                                        <FaAngleDown/>
                                        <div className='invisible absolute bg-white p-2
                                                        translate-y-[55%] flex flex-col
                                                        transition-all group-hover:visible duration-200
                                                        rounded-md gap-3 w-[200px]'>

                                            {
                                                catalog?.map((category, index) => (
                                                    <Link to={`catalog/${category.name.split(" ").join("_").toLowerCase()}`} className='text-black font-bold
                                                     hover:bg-richblack-100 rounded-md items-center w-full p-2' key={index} onClick={() => set_state(false)}>
                                                        {category.name}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        ))                
                        }
                    </div>

                    <div className={`${token !== null ? "border-b-2 border-richblack-600 py-2" : ""}`}>
                        {  
                            token !== null && 
                            sidebarLinks.map((link, index) => (
                                <SideBarButton name={link.name} icon={link.icon} path={link.path} acc_type={link.type} key={link.id} flag={true} set_state={set_state}/>
                            ))
                        }
                    </div>

                    <div>
                        {
                            token !== null && 
                            <SideBarButton name={"Settings"} path={"/dashboard/settings"} icon="VscSettingsGear" flag={true} set_state={set_state}/>
                        }
                        {
                            token !== null && 
                            <button className={`flex gap-2 font-bold items-center p-2 text-pure-greys-300`}
                               onClick={() => {
                                    set_confirmation_model({
                                        data_1: "Log Out???",
                                        data_2: "Do you really want to log out from your account",
                                        btn1_text: "Log Out",
                                        btn2_text: "Cancel",
                                        btn1_fun: () => {
                                            dispatch(logout(navigate));
                                            set_confirmation_model(null);
                                        },
                                        btn2_fun: () => set_confirmation_model(null)
                                    })
                                }}>
                                <span className='w-[5px] mr-4'></span>
                                <IoExitOutline className='text-lg'/>
                                <p>Log out</p>
                            </button>
                        }
                    </div>
                </div>
            </div>

            {confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>}
        </div>
    )
}
