import { Navigate, createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import DefaultLayout from './layouts/DefaultLayout';
import GuestLayout from './layouts/GuestLayout';
import Login from './pages/Login';
import Category from './pages/Category';
import Recipe from './pages/Recipe';
import CreateRecipe from './pages/CreateRecipe';
import Favorite from './pages/Favorite';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/home'} />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'category/:categoryID',
                element: <Category />
            },
            {
                path: 'recipe/:recipeID',
                element: <Recipe />
            },
            {
                path: 'create-recipe',
                element: <CreateRecipe />
            },
            {
                path: 'favorite',
                element: <Favorite />
            },
            {
                path: 'profile/:profileID',
                element: <Profile />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            // {
            //     path: '/login',
            //     element: <Login />
            // },
            {
                path: '/singup',
                element: <Signup />
            },
        ]
    },

    {
        path: "*",
        element: <NotFound />
    }
])

export default router; 