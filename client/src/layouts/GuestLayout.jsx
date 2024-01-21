import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login';

function GuestLayout() {
    const { isAuthenticated, isLoading  } = useAuth0();

    if (isLoading) {
        return <>Loading ....</>
    }

    if (isAuthenticated) {
        return <Navigate to="/home" />
    }

    return (
        <div><Login /></div>
    )
}

export default GuestLayout