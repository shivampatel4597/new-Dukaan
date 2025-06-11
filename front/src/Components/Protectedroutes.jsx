import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Protectedroutes = () => {
     const accessToken = useSelector(state => state.auth.accessToken);
  

  if(!accessToken){
     return <Navigate to="/login" replace/>
  }

  return <Outlet/>

}

export default Protectedroutes