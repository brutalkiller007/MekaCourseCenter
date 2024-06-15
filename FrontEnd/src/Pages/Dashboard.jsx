import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from '../Components/Common/SideBar/SideBar';
import { useSelector } from 'react-redux';
import Spinner from '../Components/Common/Spinner';

export const Dashboard = () => {

    const {loading : auth_loading} = useSelector((state) => state.auth);
    const {loading: profile_loading} = useSelector((state) => state.profile);

    if(auth_loading || profile_loading)
        return (<Spinner/>)
        
    return (
        <div className='flex min-h-screen bg-richblack-900'>
            
            <SideBar/>

            <div className='min-h-100vh w-full py-10'>
                  <div className='w-11/12 max-w-[800px] mx-auto'>
                      <Outlet/>
                  </div>
            </div>
        </div>
    )
}
