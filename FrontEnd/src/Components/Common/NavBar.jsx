import React from 'react'
import logo from "../../Assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../../Data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../Auth/ProfileDropDown';
import { useState, useEffect } from 'react';
import { api_connector } from '../../Services/apiConnector';
import { categories } from '../../Services/apis';
import { FaAngleDown } from "react-icons/fa6";

import MiniSideBar from '../MiniSideBar/MiniSideBar';

export const NavBar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user_details} = useSelector( (state) => state.profile);
    const {total_items} = useSelector( (state) => state.cart);

    const [catalog, set_catalog] = useState([]);

    const get_catalog_list = async () => {
        try{
            const result = await api_connector("GET", categories.GET_CATEGORIES);
            set_catalog(result.data.categories);
        }
        catch(error){
            console.log("Could not fetch category list");
        }
    }

    useEffect(() => {
        get_catalog_list();
    }, []);

    const location = new useLocation();
    const route_check = (route) => {
        return matchPath({path:route}, location.pathname);
    } 

  return (

    <div className="bg-richblack-800 border-b-2 border-richblack-700 fixed w-full z-40 h-[3.5rem]">
        <div className="lg:w-3/4 w-11/12 mx-auto h-14 flex items-center justify-between">

            <div className='lg:hidden'>
                <MiniSideBar catalog={catalog}/>
            </div>

            <Link to={"/"} >
                <img src={logo} alt="dark_logo" loading='lazy'></img>
            </Link>

            
            <nav className='text-white hidden lg:block relative'>
                <ul className='flex gap-4'>
                {
                    NavbarLinks.map( (link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? 
                                (<div>
                                    <div className='flex items-center gap-1 group relative font-semibold'>
                                        {link.title}
                                        <FaAngleDown />

                                        <div className='invisible absolute bg-white p-2
                                                        translate-y-[60%] flex flex-col translate-x-[-25%]
                                                        transition-all group-hover:visible duration-200
                                                        rounded-md gap-3 w-[200px] z-50'>

                                            {
                                                catalog?.map((category, index) => (
                                                    <Link to={`catalog/${category.name.split(" ").join("_").toLowerCase()}`} className='text-black font-bold
                                                     hover:bg-richblack-100 rounded-md items-center w-full p-2' key={index}>
                                                        {category.name}
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    
                                </div>) 
                                : 
                                (<Link to={link.path} className={route_check(link?.path) ? "text-yellow-100 font-semibold": "text-white font-semibold"}>
                                    {link.title}
                                </Link>)
                            }
                        </li>
                    ))
                }
                </ul>
            </nav>

            
            {/*Login , sign and Dashboard*/}
            <div className='lg:block hidden'>
                <div className='flex gap-x-4 items-center'>
                    {
                        user_details && user_details?.account_type !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative text-pure-greys-300 h-full'>
                                <div>
                                    <IoCartOutline size={30}/>
                                </div>
                                {
                                    total_items !== 0 && (
                                        <span className='absolute text-richblack-900 bg-pure-greys-300 rounded-[50%] aspect-square h-[1rem] grid place-content-center font-bold top-[50%] left-[50%]'>
                                            {total_items}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className="bg-richblack-800 text-white px-[12px] py-[8px] border-2
                                border-richblack-600 rounded-md">
                                    Log In
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="bg-richblack-800 text-white px-[12px] py-[8px] border-2
                                border-richblack-600 rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {
                        user_details &&
                        <img src={user_details.image} className=' h-[2.5rem] aspect-square rounded-[50%] object-cover' alt=''></img>
                    }

                    {
                        token !== null && <ProfileDropDown/>
                    }
                
                </div>
            </div>
        </div>
    </div>

  )
}

