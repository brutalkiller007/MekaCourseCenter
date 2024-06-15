import React, { useState } from 'react';
import { sidebarLinks } from '../../../Data/dashboard-links';
import SideBarButton from './SideBarButton';
import { IoExitOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../Services/Service_Functions/Auth';
import ConfirmationModel from '../ConfirmationModel';

export default function SideBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmation_model, set_confirmation_model] = useState(null);

    return (
        <>
            <div className='hidden lg:block bg-richblack-800 min-w-[250px]'>
                <div className='flex flex-col my-6'>
                    {
                        sidebarLinks.map((link) => (
                            <SideBarButton name={link.name} icon={link.icon} path={link.path} acc_type={link.type} key={link.id}/>
                        ))
                    }

                    <div className='border-[0.5px] border-pure-greys-300 my-6'></div>

                    <SideBarButton name={"Settings"} path={"/dashboard/settings"} icon="VscSettingsGear"/>
                    
                    <button className={`flex gap-2 font-bold items-center p-2 text-pure-greys-300`} 
                        onClick={() => {
                            set_confirmation_model({
                                data_1: "Log Out???",
                                data_2: "Do you really want to log out from your account",
                                btn1_text: "Log Out",
                                btn2_text: "Cancel",
                                btn1_fun: () => dispatch(logout(navigate)),
                                btn2_fun: () => set_confirmation_model(null)
                            })
                        }}>
                        <span className='w-[5px] mr-4'></span>
                        <IoExitOutline className='text-lg'/>
                        <p>Log out</p>
                    </button>
                </div>
            </div>
            
            {confirmation_model && <ConfirmationModel confirmation_model={confirmation_model}/>}
        </>
    )
}
