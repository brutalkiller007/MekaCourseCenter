import React from 'react'

export default function Spinner() {
  return (
    <div className='fixed inset-0 w-screen h-screen'>
        <div className='w-full h-full flex items-center justify-center bg-richblack-900'>
          <div className='border-pure-greys-300 h-20 font-bold w-20 animate-spin rounded-full border-8 border-t-white'>
          </div>
      </div>
    </div>
  )
}
