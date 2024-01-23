import React, { useEffect, useState } from 'react'
import { GoPerson } from "react-icons/go";
import FavoriteIcon from './FavoriteIcon'
import { Link } from 'react-router-dom';
function RecipeCard({ recipe }) {
    const { _id, title, difficultyLevel, servingSize, author, ingredients, steps ,cookingTime} = recipe
    const id = _id ? _id : ''
    const recipeImageUrl = 'http://localhost:3001/images/recipes/'; 

    return (
        <>
            <div className='w-[37ex] '>
                <div className='shadow-lg shadow-[#A79086] rounded-lg p-7 bg-[#deded4] ' >
                    <img src={`${recipeImageUrl}${recipe._id}.jpg`}  className='h-[30ex] w-[35ex] rounded-lg object-cover'/>
                    <div className='w-[35ex] m'>
                        <Link to={`/recipe/${_id}`} className='w-full font-bold mt-5 inline-block text-[2ex] mb-2 cursor-pointer hover:underline underline-offset-2 text-ellipsis text-nowrap overflow-clip'>{title}</Link>
                        <div className='ml-2'>
                            <h3 className='w-full mb-2 text-[2ex] '>Difficulty: {difficultyLevel && difficultyLevel}</h3>
                            <h3 className='w-full mb-2 text-[2ex] '>Cooking time: {cookingTime && cookingTime} min</h3>
                            <h3 className='w-full mb-2 text-[2ex] '>- {ingredients && ingredients.length} ingredients</h3>
                            <h3 className='w-full mb-2 text-[2ex] '>- {steps && steps.length} steps</h3>
                            <h3 className='w-full mb-2 text-[2ex] '>- Serving {servingSize && servingSize} persons</h3>
                        </div>

                        <div className='mt-6 flex items-center w-[31ex] justify-between '>
                            <div>
                                <Link to={`/profile/${recipe.author.googleId }`} className='cursor-pointer hover:underline underline-offset-2 inline-block'>{author && author.username}</Link>
                            </div>
                            <FavoriteIcon recipeID={id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeCard