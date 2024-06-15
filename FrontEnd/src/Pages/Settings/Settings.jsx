import React from 'react'
import ProfilePicChange from './ProfilePicUpdate';
import PersonalDetailsUpdate from './PersonalDetailsUpdate';
import { PasswordUpdate } from './PasswordUpdate';
import DeleteAccount from './DeleteAccount';

export default function Settings() {
    return (
        <div className='text-white flex flex-col gap-10'>
            <h1 className='text-4xl font-bold text-center'>Edit Profile</h1>

            <ProfilePicChange/>

            <PersonalDetailsUpdate/>

            <PasswordUpdate/>

            <DeleteAccount/>
        </div>
    )
}
