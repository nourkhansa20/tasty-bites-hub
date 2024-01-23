import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAuth0 } from '@auth0/auth0-react';
import axiosClient from '../axios-client';

function DefaultLayout() {

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <>Loading ....</>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  } else {

  }

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default DefaultLayout