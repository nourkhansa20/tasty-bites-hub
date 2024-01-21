import React from 'react'
import CustomTextFiled from '../components/CustomTextFiled'

function IngredientAdd({ style }) {
    return (
        <div className={'flex justify-between  gap-10 ' + style}>
            <CustomTextFiled name="quantity" placeholder="Quantity" />
            <CustomTextFiled name="ingredients" placeholder="Ingredient" />
        </div>
    )
}

export default IngredientAdd