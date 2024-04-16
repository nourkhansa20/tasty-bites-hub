import React, { useEffect, useRef, useState } from 'react'
import CustomTextFiled from '../components/CustomTextFiled'
import IngredientAdd from '../components/IngredientAdd';
import StepAdd from '../components/StepsAdd';
import CustomDragAndDrop from '../components/CustomDragAndDrop';
import CustomButton from '../components/CustomButton';
import axiosClient from '../axios-client';
import $ from 'jquery'
import CustomSelect from '../components/CustomSelect';
import {
    cookingTimeOption,
    difficultyOption,
    servingSizeyOption
} from '../data/SelectOption.js'
import { useNavigate } from 'react-router-dom';
function CreateRecipe() {
    const navigate = useNavigate();

    const addNewIngredient = (newIngredient) => {
        setIngredientIndexy(ingredientIndex + 1)
        const newIngredients = [...ingredientsT, newIngredient]
        setIngredientT(newIngredients)
    }

    const addNewStep = (newStep) => {
        setStepIndex(stepIndex + 1)
        const newSteps = [...stepsT, newStep]
        setStepsT(newSteps)
    }

    const getIngredients = async () => {
        var i = []
        $('.ingredients').each(function () {
            i.push($(this).val());
        });

        var q = []
        $('.quantity').each(function () {
            q.push($(this).val());
        });

        for (let index = 0; index < i.length; index++) {
            ingredients.push({ name: i[index], quantity: q[index] })
        }
    }

    const getSteps = async () => {
        $('.step').each(function () {
            steps.push($(this).val());
        });

    }

    const getImage = async (file) => {
        console.log(file)
        setImage(file)
    }

    const createRecipe = async () => {
        await getIngredients()
        await getSteps()
        if (!titleRef.current.value) {
            alert("Title require")
        }
        if (ingredients.length === 0) {
            alert("You should add at least 1 ingredients")
        }
        if (steps.length === 0) {
            alert("You should add at least 1 steps")
        }
        if (!cookingTime) {
            alert("Cooking time require")
        }
        if (!difficultyLevel) {
            alert("Difficulty Level require")
        }
        if (!servingSize) {
            alert("Serving size require")
        }
        if (!category) {
            alert("Category require")
        }
        if (titleRef.current.value && cookingTime && difficultyLevel && servingSize && category && ingredients.length !== 0 && steps.length !== 0) {
            const recipe = {
                title: titleRef.current.value,
                ingredients,
                steps,
                cookingTime: cookingTime.value,
                difficultyLevel: difficultyLevel.value,
                servingSize: servingSize.value,
                category: category.value
            }
            console.log(recipe)
            const newRecipe = await axiosClient.post('/recipe/create', recipe)
            await axiosClient.post(`/recipe/save-recipe-photo/${newRecipe.data.recipe._id}`, image)
            navigate(`/recipe/${newRecipe.data.recipe._id}`)
            ingredients.length = 0;
            steps.length = 0;
        }
    }

    const titleRef = useRef()

    const [ingredientIndex, setIngredientIndexy] = useState(1)
    const [ingredientsT, setIngredientT] = useState([ingredientIndex])

    const [stepIndex, setStepIndex] = useState(1)
    const [stepsT, setStepsT] = useState([stepIndex])

    const [image, setImage] = useState()

    const [categories, setCatogories] = useState([])
    const [category, setCatogory] = useState([])
    const [servingSize, setServingSize] = useState([])
    const [cookingTime, setCookingTime] = useState([])
    const [difficultyLevel, setDifficultyLevel] = useState([])


    const ingredients = []
    const steps = []

    const fetchData = async () => {
        const response = await axiosClient.get('/categories')
        const c = []
        response.data.forEach(element => {
            c.push({ value: element._id, label: element.name })
        });
        setCatogories(c)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='mt-28 flex justify-center w-full ' >
            <div className='shadow-lg shadow-[#A79086] rounded-lg p-7 bg-[#deded4] lg:w-4/6 w-4/5 mb-40'>
                <div className='lg:flex justify-around'>
                    <div>
                        <h1 className='lg:text-[4ex] text-[2.8ex] mb-6 mt-2'>Create New Recipe</h1>
                        <CustomTextFiled label="Title" ref={titleRef} placeholder="Title" />

                        <label className='block mb-3'>Ingredients</label>
                        <div>
                            {
                                ingredientsT.map(ingredient => (<IngredientAdd />))
                            }
                            <div className='flex justify-end '>
                                <button onClick={() => addNewIngredient("s")} className='hover:underline underline-offset-4'>+ Add new Ingredient</button>
                            </div>
                        </div>

                        <label className='block mb-3'>Steps </label>
                        <div>
                            {
                                stepsT.map(step => (<StepAdd />))
                            }
                            <div className='flex justify-end '>
                                <button onClick={() => addNewStep("s")} className='hover:underline underline-offset-4'>+ Add new Step</button>
                            </div>
                        </div>

                        <div>
                            <CustomSelect options={cookingTimeOption} label="Cooking Time" onChange={setCookingTime} style="mb-3" />
                            <CustomSelect options={servingSizeyOption} label='Serving Size' onChange={setServingSize} style="mb-3" />
                            <CustomSelect options={difficultyOption} label='Difficulty Level' onChange={setDifficultyLevel} style="mb-3" />
                            <CustomSelect options={categories} label='Category' onChange={setCatogory} style="mb-3" />
                        </div>
                    </div>
                    <CustomDragAndDrop sendImage={getImage} style='h-[40ex] lg:w-[45ex] lg:ml-3 lg:mt-[13.5ex] mt-6' />
                </div>
                <div className='flex justify-center lg:justify-end lg:mr-6 mt-6'>
                    <CustomButton onClick={() => createRecipe()} label="Create Recipe" style="py-4 px-7 " />
                </div>
            </div>
        </div>
    )
}

export default CreateRecipe