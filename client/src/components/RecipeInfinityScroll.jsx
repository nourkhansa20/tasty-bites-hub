import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'
import axiosClient from '../axios-client'
import { useParams } from 'react-router-dom'
import { useCategoryContext } from '../context/CategoryContextProvider.jsx'


function RecipeInfinityScroll({ params }) {

    const { cookingTime, difficulty, servingSize } = useCategoryContext()

    const fetchData = async () => {

        console.log(cookingTime)
        console.log(difficulty)
        console.log(servingSize)
        const params = {
            cookingTime,
            difficulty,
            servingSize
        }
        const recipesDB = await axiosClient.get(`/recipe/category/${categoryID}`, { params })
        setRecipes(recipesDB.data)
    }

    useEffect(() => {
        fetchData();
    }, [cookingTime, difficulty, servingSize])


    const [recipes, setRecipes] = useState()
    const { categoryID } = useParams();

    return (
        <div className='w-f grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
            {
                recipes ? (
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))
                ) : (
                    'No Recipe available in this Category'
                )
            }
        </div>
    )
}

export default RecipeInfinityScroll