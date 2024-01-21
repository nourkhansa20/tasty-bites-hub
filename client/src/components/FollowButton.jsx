import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import CustomButton from './CustomButton';

function FollowButton({ userId, style }) {
    const [isFollow, setIsFollow] = useState();
    const [_userid, setUserId] = useState();

    useEffect(() => {
        fetchData();
    }, [])

    const handelFollow = async () => {
        const response = await axiosClient.post(`/user/user-follow/${userId}`)
        console.log(response.data)
        setIsFollow(response.data.isFollowing)
    }
    const fetchData = async () => {
        const follow = await axiosClient.get(`/user/is-user-following/${userId}`)
        console.log(userId)
        setUserId(userId)
        setIsFollow(follow.data.isFollowing)
    }


    return (
        <>
            <div className='pl-2'>
                {
                    isFollow ?
                        <CustomButton label={'Following'} style={'w-[12ex] bg-[#c9c9be] text-[#782438] ' + style} onClick={() => handelFollow()} />
                        :
                        <CustomButton label={'Follow'} style={'w-[12ex] ' + style} onClick={() => handelFollow()} />
                }
            </div>
        </>
    )
}

export default FollowButton