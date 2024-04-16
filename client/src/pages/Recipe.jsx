import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { GoPerson } from "react-icons/go";
import CustomTextArea from '../components/CustomTextArea';
import CustomButton from '../components/CustomButton';
import FavoriteIcon from '../components/FavoriteIcon';
import FollowButton from '../components/FollowButton';
import { useAuth0 } from '@auth0/auth0-react';


function Recipe() {
    const { recipeID } = useParams();

    const fetchData = async () => {
        try {
            const response = await axiosClient.get(`/recipe/${recipeID}`)
            setRecipe(response.data)
            setIngredient(response.data.ingredients)
            setSteps(response.data.steps)
            setAuthorId(response.data.author._id)
            setComments(response.data.comments)
        } catch (error) {
            console.error('Error fetching favorite recipes:', error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchData();
    }, [recipeID])

    const commentRef = useRef()
    const [recipe, setRecipe] = useState();
    const [ingredient, setIngredient] = useState();
    const [steps, setSteps] = useState();
    const [comments, setComments] = useState();
    const [authorId, setAuthorId] = useState()
    const [loading, setLoading] = useState(true);
    const {isAuthenticated , user} = useAuth0()
    const recipeImageUrl = 'http://localhost:3001/images/recipes/';

    const handelComment = async () => {
        if(isAuthenticated){
        const comment = commentRef.current.value
        const commentFrom = {
            recipeId: recipeID,
            text: comment,
        }
        await axiosClient.post('/comment/create', commentFrom)
        const username = user.nickname
        const addComment = {
            recipeId: recipeID,
            text: comment,
            user: {
                username,
            }
        }

        commentRef.current.value = ""

        setComments([addComment, ...comments])
    }else{
        alert("You Should login")
    }
    }
    if (loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <div className='mt-28 flex flex-col justify-center items-center w-full ' >
                <div className='shadow-lg shadow-[#A79086] rounded-lg p-10 bg-[#deded4] w-3/4 flex lg:flex-row flex-col lg:justify-between items-start'>
                    <div className='w-full'>
                        <div className='flex md:items-center mb-3 text-[1.5ex] md:text-[2.2ex] font-semibold flex-col md:flex-row items-start'>
                            <h1 className='text-[4ex]'>{recipe ? recipe.title : ""}</h1>
                            <FavoriteIcon recipeID={recipeID} />
                        </div>
                        <div className='w-full flex flex-col md:flex-row md:items-center mb-2'>
                            Made by : <Link to={`/profile/${recipe.author.googleId}`} className='text-[1.9ex] cursor-pointer hover:underline underline-offset-2'> {recipe ? " " + recipe.author.username : ""}</Link>

                            {
                                localStorage.getItem('USER_ID') !== authorId &&
                                <FollowButton userId={authorId && authorId} style={'w-[18ex] h-[4ex]'} />
                            }
                        </div>
                        <h3 className='text-[1.7ex] mb-2'>Category : {recipe ? recipe.category.name : ""}</h3>
                        <h3 className='text-[1.7ex] mb-2'>Difficulity : {recipe ? recipe.difficultyLevel : ""}</h3>
                        <h3 className='flex  gap-2 items-center'><GoPerson size={18} /> <span>{recipe ? recipe.servingSize : ""}</span></h3>
                        <div className='mt-3'>
                            <h2 className='text-[3ex] mb-2'>Ingredient</h2>
                            <div className="grid md:grid-cols-2 w-[40ex]">
                                {ingredient ? (
                                    ingredient.map((item, index) => (
                                        <>
                                            <div className=''>- {item.quantity}</div>
                                            <div className=''> {item.name}</div>
                                        </>
                                    ))
                                ) : (
                                    <p>No ingredients available</p>
                                )}
                            </div>

                        </div>
                        <div className='w-full'>
                            <h2 className='text-[3ex] mb-2 mt-5'>Steps</h2>
                            {steps ? (
                                steps.map((step, index) => (
                                    <div key={index} className='w-full text-wrap overflow-hidden '>- {step}</div>
                                ))
                            ) : (
                                <p>No steps available</p>
                            )}
                        </div>
                    </div>

                    <img src={`${recipeImageUrl}${recipe._id}.jpg`} className='2xl:w-[50ex] 2xl:h-[50ex] sm:w-[50ex] sm:h-[50ex] w-[23ex] h-[23ex] rounded-2xl 2xl:ml-[ex] mt-4 lg:mt-0  object-cover' />

                </div >
                <br />
                <br />
                <div className='shadow-lg shadow-[#A79086] rounded-lg p-10 bg-[#deded4] w-3/4 mb-20'>
                    <h1 className='text-[4ex]  mb-3'>Comments</h1>
                    <div className='rounded-lg bg-[#eaeadf] p-3'>
                        <CustomTextArea ref={commentRef} />
                        <div className='flex lg:justify-end justify-center'>
                            <CustomButton label={"Comment"} style={"px-7 py-3 "} onClick={handelComment} />
                        </div>
                    </div>
                    {(
                        comments ?
                            comments.map((comment) => (
                                <div key={comment._id} className='rounded-lg bg-[#eaeadf] p-3 mt-4'>
                                    <div className='text-[2ex] mb-2 font-semibold'>{comment.user.username}</div>
                                    <div className='text-[2ex] ml-5'>{comment.text}</div>
                                </div>
                            ))
                            : "No Comments avialable"
                    )}
                </div>
            </div >
        )
    }


}

export default Recipe