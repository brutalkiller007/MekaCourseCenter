import React from 'react'
import { Link } from 'react-router-dom';
import * as Icons from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

export default function SideBarButton({name, acc_type, icon, path, flag, set_state}) {

    const {user_details} = useSelector((state) => state.profile);
    const Icon = Icons[icon];
    const location = new useLocation();

    const route_check = (route) => {
        
        return matchPath({path:route}, location.pathname);
    } 

    return (
        <Link to={path} className={`${acc_type === user_details.account_type || !acc_type ? "block" : "hidden"} ${route_check(path) && "text-yellow-200 bg-[#8B4513]"}
                                     flex text-pure-greys-300 gap-6`} onClick={() => {
                                        if(flag)
                                            set_state(false)
                                     }} >
            <span className={`${route_check(path) && "bg-yellow-200"} w-[5px]`}></span>

            <div className={`flex gap-2 font-bold items-center p-2`}>
                <Icon className="text-lg"/>
                <p>{name}</p>
            </div>
        </Link>
    )
}
