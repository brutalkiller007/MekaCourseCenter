import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

  const {token} = useSelector((state) => state.auth);
  const {user_details} = useSelector((state) => state.profile)

    if(!token || !user_details){
      return (<Navigate to={"/"}/>)
    }
    else
        return (children)
}
