import React from 'react'
import FavoriteIcon from './FavoriteIcon'
import FollowButton from './FollowButton'
import { GoPerson } from 'react-icons/go'
import { Link } from 'react-router-dom'

function RecipePost({ recipe }) {

    const recipeImageUrl = 'http://localhost:3001/images/recipes/'; 

    return (
        <>
            <div className='shadow-lg shadow-[#A79086] rounded-lg md:p-10 p-4 bg-[#deded4] w-2/3 flex lg:flex-row flex-col lg:justify-between items-start'>
                <div>
                    <div className='flex items-center mb-3 text-[1.5ex] md:text-[2.2ex] font-semibold'>
                        <Link to={`/recipe/${recipe._id}`} className='text-[3ex]'>{recipe ? recipe.title : ""}</Link>
                        <FavoriteIcon recipeID={recipe._id} />
                    </div>
                    {/* <div className='flex items-center mb-2'>
                        <h3 className='text-[1.9ex] '>Made by : {recipe ? recipe.author.username : ""}</h3>
                        <FollowButton userId={recipe.author} />
                    </div> */}
                    <h3 className='text-[1.7ex] mb-2'>Category : {recipe ? recipe.category.name : ""}</h3>
                    <h3 className='text-[1.7ex] mb-2'>Difficulity : {recipe ? recipe.difficultyLevel : ""}</h3>
                    <h3 className='flex  gap-2 items-center'><GoPerson size={18} /> <span>{recipe ? recipe.servingSize : ""}</span></h3>
                    <div className='mt-3'>
                        <h2 className='text-[3ex] mb-2'>Ingredient</h2>
                        <div className="grid grid-cols-2 w-full">
                            {recipe.ingredients ? (
                                recipe.ingredients.map((item) => (
                                    < >
                                        <div className=''>- {item.quantity}</div>
                                        <div className=''> {item.name}</div>
                                    </>
                                ))
                            ) : (
                                <p>No ingredients available</p>
                            )}
                        </div>

                    </div>
                    <div>
                        <h2 className='text-[3ex] mb-2 mt-5'>Steps</h2>
                        {recipe.steps ? (
                            recipe.steps.map((step) => (
                                <div key={recipe.steps._id}>- {step}</div>
                            ))
                        ) : (
                            <p>No steps available</p>
                        )}
                    </div>
                </div>

                <img  src={`${recipeImageUrl}${recipe._id}.jpg`}  className='2xl:w-[40ex] 2xl:h-[40ex] sm:w-[30ex] sm:h-[30ex] w-[30ex] h-[20ex] rounded-2xl bg-black 2xl:ml-[14ex] mt-4 lg:mt-0 ' />
            </div>
        </>
    )
}

export default RecipePost