import React, { useEffect, useState } from 'react'
import axiosClient from '../axios-client';
import cookingBackground from './../assets/images/cooking-background.jpg'
import HomeCategory from '../components/HomeCategory';

function Home() {
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const categories = await axiosClient.get('/recipe')
    setCategories(categories.data)
  }

  return (
    <>
      <div className='flex justify-center mt-24'>
        <div className='w-11/12 mt-5'  >
          <img src={cookingBackground} className='w-full lg:h-[70ex] object-cover object-left-top rounded-xl' alt="" />
        </div>
      </div>
      <HomeCategory categories={categories} />
    </>

  )
}

export default Home