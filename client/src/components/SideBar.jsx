import React from 'react'
import CustomSelect from './CustomSelect'
import { useCategoryContext } from '../context/CategoryContextProvider.jsx'

import {
    cookingTimeOption,
    difficultyOption,
    servingSizeyOption
} from '../data/SelectOption.js'

function SideBar() {

    const { setCookingTime, setDifficulty, setServingSize } = useCategoryContext()


    const handleCookingTime = (value) => {
        setCookingTime(value.value)
    }
    const handleServingSize = (value) => {
        setServingSize(value.value)
    }
    const handleDifficulity = (value) => {
        setDifficulty(value.value)
    }

    return (
        <>
            <div className='md:h-screen md:w-[35ex] ml-2 h-[7ex] w-[38ex] bg-[#deded4] rounded-lg md:fixed md:p-6 p-[1.1ex] shadow-lg shadow-[#A79086] mb-4 '>
                <h3 className='text-[2.5ex]  hidden md:block  '>Filter Recipes By</h3>
                <div className='md:block flex justify-between items-center'>
                    <div>
                        <CustomSelect options={cookingTimeOption} defaultValue={cookingTimeOption[0]} onChange={handleCookingTime} style="md:mt-6" label="Cooking Time" responsiveLabel />
                    </div>
                    <div>
                        <CustomSelect options={difficultyOption} defaultValue={difficultyOption[0]} onChange={handleDifficulity} style="md:mt-6" label="Difficulity" responsiveLabel />
                    </div>
                    <div>
                        <CustomSelect options={servingSizeyOption} defaultValue={servingSizeyOption[0]} onChange={handleServingSize} style="md:mt-6" label="Serving Size" responsiveLabel />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar