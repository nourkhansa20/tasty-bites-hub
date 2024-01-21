import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import RecipePost from '../components/RecipePost';
import FollowButton from '../components/FollowButton';
import CustomButton from '../components/CustomButton';

function Profile() {

    const { profileID } = useParams();
    const [recipes, setRecipes] = useState()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData();
    }, [profileID])


    const fetchData = async () => {
        try {
            const recipesDB = await axiosClient.get(`/recipe/user/${profileID}`)
            const userData = await axiosClient.get(`/user/id/${profileID}`)
            setRecipes(recipesDB.data)
            setUser(userData.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }

    }

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
                        <div className='bg-black h-[25ex] w-[25ex] rounded-xl'></div>
                        <div className='lg:ml-4 mt-5'>
                            <div className='flex flex-col md:flex-row items-center mb-4 gap-4'>
                                <div className='text-[3ex] '>{user && user.username}</div>
                                {
                                    localStorage.getItem('USER_ID') !== user._id ?
                                        <FollowButton userId={user && user._id} style={'w-[18ex] h-[4ex]'} />
                                        :
                                        <CustomButton label={'Logout'} style={'w-[17ex] h-10'} onClick={logout} />
                                }

                            </div>

                            <div className=' mt-5 flex gap-8 md:text-[2.2ex] mb-4 text-[1.3ex]'>
                                <div><span className='font-semibold'>{recipes && recipes.length}</span> recipes</div>
                                <div><span className='font-semibold'>{user && user.followers.length}</span> followers</div>
                                <div><span className='font-semibold'>{user && user.following.length}</span> following</div>
                            </div>
                            <div>{user.bio ? user.bio : "lorecahifhijAKPSCJBZCLKlsss"}</div>
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