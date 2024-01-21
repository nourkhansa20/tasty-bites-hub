import React from 'react'
import CategoriesSlider from './CategoriesSlider'

function HomeCategory({ categories }) {
console.log(categories);
  return (
    <div className='lg:mx-[9ex] px-7 lg:px-0 my-5'>
      {
        categories ? (
          categories.map((recipes) => (
            <CategoriesSlider key={recipes[0].category._id} recipes={recipes} />
          ))
        ) : (
          "No recipe available"
        )
      }
    </div>
  )
}

export default HomeCategory