import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import RecipePost from '../components/RecipePost';
import FollowButton from '../components/FollowButton';
import CustomButton from '../components/CustomButton';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';

function Profile() {

    const { profileID } = useParams();
    const [recipes, setRecipes] = useState()
    const [userP, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const { user } = useAuth0()

    const fetchData = async () => {
        try {
            const recipesDB = await axiosClient.get(`/recipe/user/${profileID}`)
            const userData = await axiosClient.get(`/user/id/${profileID}`)
            console.log(userData.data)
            console.log(recipesDB.data)
            setRecipes(recipesDB.data)
            setUser(userData.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchData();
    }, [profileID])


    const logout = () => {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('USER_ID')
        localStorage.removeItem('USERNAME')
        location.reload();
    }

    if (loading) {
        return <>Loading....</>
    } else {
        return (
            <div className='mt-28'>
                <div className=' flex  justify-center items-center mb-12'>
                    <div className=' w-2/3 flex gap-8  md:flex-row flex-col items-center '  >
                        {
                            user?.sub == userP?.googleId ?
                                <img className=' h-[25ex] w-[25ex] rounded-xl' src={user && user.picture} />
                                :
                                <img className=' h-[25ex] w-[25ex] rounded-xl' src={userP.profilePicture} />


                        }
                        <div className='lg:ml-4 mt-5'>
                            <div className='flex flex-col md:flex-row items-center mb-4 gap-4'>
                                <div className='text-[3ex] '>{userP && userP.username}</div>
                                {
                                    user?.sub == userP?.googleId ?
                                        <LogoutButton label={'Logout'} style={'w-[17ex] h-10'} onClick={logout} />
                                        :
                                        <FollowButton userId={userP && userP._id} style={'w-[18ex] h-[4ex]'} />
                                }

                            </div>

                            <div className=' mt-5 flex gap-8 md:text-[2.2ex] mb-4 text-[1.3ex]'>
                                <div><span className='font-semibold'>{recipes && recipes.length}</span> recipes</div>
                                <div><span className='font-semibold'>{userP && userP.followers.length}</span> followers</div>
                                <div><span className='font-semibold'>{userP && userP.following.length}</span> following</div>
                            </div>
                            {/* <div>{userP.bio ? userP.bio : "lorecahifhijAKPSCJBZCLKlsss"}</div> */}
                        </div>


                    </div>
                </div>

                <div className='flex gap-8 flex-col items-center '>
                    {
                        recipes ? (
                            recipes.map((recipe) => (
                                <RecipePost key={recipe._id} recipe={recipe} />
                            ))
                        ) : (
                            "No recipe available"
                        )
                    }
                </div>
            </div>

        )
    }


}

export default Profile