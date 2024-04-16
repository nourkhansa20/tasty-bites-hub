import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import CustomButton from './CustomButton';
import { useAuth0 } from '@auth0/auth0-react';

function FollowButton({ userId, style }) {
    const [isFollow, setIsFollow] = useState();
    const [_userid, setUserId] = useState();
    const { isAuthenticated } = useAuth0()
    useEffect(() => {
        fetchData();
    }, [])

    const handelFollow = async () => {
        if (isAuthenticated) {
            const response = await axiosClient.post(`/user/user-follow/${userId}`)
            console.log(response.data)
            setIsFollow(response.data.isFollowing)
        } else {
            alert("You should Login")
        }

    }
    const fetchData = async () => {
        if (isAuthenticated) {
            const follow = await axiosClient.get(`/user/is-user-following/${userId}`)
            console.log(userId)
            setUserId(userId)
            setIsFollow(follow.data.isFollowing)
        }
    }


    return (
        <>
            <div className='pl-2'>
                {
                    isFollow ?
                        <CustomButton label={'Following'} style={'w-[12ex] bg-[#c9c9be] following-button ' + style} onClick={() => handelFollow()} />
                        :
                        <CustomButton label={'Follow'} style={'w-[12ex] ' + style} onClick={() => handelFollow()} />
                }
            </div>
        </>
    )
}

export default FollowButton