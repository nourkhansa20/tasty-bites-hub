import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client'
import RecipeCard from '../components/RecipeCard'
function Favorite() {
    const [recipes, setRecipe] = useState([])

    const fetchData = async () => {
        const favoriteRecipe = await axiosClient.get('/recipe/favorites')
        console.log(favoriteRecipe.data.favorites)
        setRecipe(favoriteRecipe.data.favorites)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className='mt-28 w-full justify-items-center grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-5'>
                {recipes ? (
                    recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} />
                    ))
                ) : (
                    <p>No recipe available</p>
                )}
            </div>
        </>
    )
}

export default Favorite