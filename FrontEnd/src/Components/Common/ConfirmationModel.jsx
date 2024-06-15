import React from 'react'

export default function ConfirmationModel({confirmation_model}) {
    return (
        <div className="fixed w-screen h-screen inset-0 right-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm ">
            <div className=' bg-richblack-800 h-fit max-w-[300px] flex flex-col gap-3 p-4 rounded-md border-4 border-richblack-600'>
                <h1 className='text-2xl font-bold text-white'>{confirmation_model.data_1}</h1>

                <p className='text-pure-greys-300 font-semibold'>{confirmation_model.data_2}</p>

                <div className='flex gap-2 justify-start'>
                    <button className='bg-yellow-300 w-fit px-3 py-2 rounded-md text-black font-bold' onClick={confirmation_model.btn1_fun}>{confirmation_model.btn1_text}</button>
                    <button className='bg-pure-greys-300 w-fit px-3 py-2 rounded-md text-black font-bold' onClick={confirmation_model.btn2_fun}>{confirmation_model.btn2_text}</button>
                </div>
            </div>
        </div>
    )
}
