import React from 'react'
import RecipeInfinityScroll from '../components/RecipeInfinityScroll'
import SideBar from '../components/SideBar'
import { CategoryContextProvider } from '../context/CategoryContextProvider'

function Category() {


    return (
        <CategoryContextProvider>
            <div className='flex flex-col md:block justify-center items-center w-full mt-24'>
                <SideBar />
                <div className='md:ml-[40ex]'>
                    <RecipeInfinityScroll />
                </div>
            </div>
        </CategoryContextProvider>

    )
}

export default Category