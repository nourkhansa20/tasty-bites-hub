import React from 'react'
import RecipeCard from './RecipeCard'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

function CategoriesSlider({ recipes }) {
    const category = recipes[0].category
    return (
        <>
            <div className=' mb-10'>
                <h2 className='text-[3.5ex] mb-4'>{category ? category.name : ""}</h2>
                <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center'>
                    {
                        recipes ? (
                            recipes.map((recipe) => (
                                <RecipeCard key={recipe._id} recipe={recipe} />
                            ))
                        ) : (
                            'No recipe available'
                        )
                    }
                </div>
                <div className='flex justify-end px-12 items-center mt-7 cursor-pointer'>
                    <Link to={`/category/${category._id}`} className="hover:underline underline-offset-4">See more {category ? category.name : ""}</Link>
                    <IoIosArrowForward />

                </div>
            </div>

        </>
    )
}

export default CategoriesSlider