import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import { IoMdHeart } from 'react-icons/io'
import { CiHeart } from 'react-icons/ci'
import { useAuth0 } from '@auth0/auth0-react'

function FavoriteIcon({ recipeID }) {
    const { isAuthenticated } = useAuth0()
    const handelLike = async () => {
        if (isAuthenticated) {
            const response = await axiosClient.post(`/recipe/add-to-favorites/${recipeID}`)
            setIsLike(response.data.message)
        } else {
            alert("You should login")
        }

    }
    const fetchData = async () => {
        if (isAuthenticated) {
            const isFavorite = await axiosClient.get(`/recipe/is-favorite/${recipeID}`)
            setIsLike(isFavorite.data.isFavorite)
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const [isLike, setIsLike] = useState()

    return (
        <>
            {isLike ?
                <IoMdHeart className='md:ml-8 cursor-pointer' size={38} onClick={() => handelLike()} />
                :
                <CiHeart className='md:ml-8 cursor-pointer' size={38} onClick={() => handelLike()} />
            }
        </>
    )
}

export default FavoriteIcon