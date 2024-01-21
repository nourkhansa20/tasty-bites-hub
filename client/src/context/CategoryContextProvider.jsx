import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext({
    cookingTime: null,
    difficulty: null,
    servingSize: null,
    setCookingTime: () => { },
    setDifficulty: () => { },
    setServingSize: () => { },
});

export const CategoryContextProvider = ({ children }) => {
    const [cookingTime, setCookingTime] = useState();
    const [difficulty, setDifficulty] = useState();
    const [servingSize, setServingSize] = useState();

    return (
        <CategoryContext.Provider value={{
            cookingTime,
            difficulty,
            servingSize,
            setCookingTime,
            setDifficulty,
            setServingSize,
        }}>
            {children}
        </CategoryContext.Provider>
    )
};

export const useCategoryContext = () => useContext(CategoryContext)
