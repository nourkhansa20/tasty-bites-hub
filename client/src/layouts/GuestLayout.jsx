import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Login from '../pages/Login';
import axiosClient from '../axios-client';

function GuestLayout() {
    const { isAuthenticated, isLoading ,user} = useAuth0();

    const myPromise = async () => {

        const response = await axiosClient.post('/auth/checkOrCreateUser',user)
        console.log(response.data)

    }

    if (isLoading) {
        return <>Loading ....</>
    }

    if (isAuthenticated) {
        myPromise()
        return <Navigate to="/home" />
    }

    return (
        <div><Login /></div>
    )
}

export default GuestLayout