import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pizza from './../assets/images/pizza.jpg'
import Logo from '../assets/images/logo.png'
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useAuth0 } from '@auth0/auth0-react';

function NavBar() {
  const { user } = useAuth0()
  const [nav, setNav] = useState(false)

  const menu = [
    {
      id: 1,
      name: 'HOME',
      path: '/home'
    }, {
      id: 2,
      name: 'CREATE RECIPE',
      path: '/create-recipe'
    }, {
      id: 3,
      name: 'FAVORITR',
      path: '/favorite'
    }, {
      id: 4,
      name: 'PROFILE',
      path: `/profile/${user.sub}`
    }

  ]

  return (
    <div className='w-screen fixed top-0 h-[10ex] bg-[#6D041D] flex items-center justify-between p-9 z-10 '>
      <Link to='/home' className='text-white cursor-pointer'>
        <img src={Logo} alt='Logo Image' className='w-[20ex] h-[5ex]' />
      </Link>

      <div className='md:flex hidden justify-between items-center text-[#dcdcd0] '>
        <ul className='flex gap-5 mr-16 '>
          {
            menu.map((item, index) => index < 3 && (
              <li key={item.id} className='hover:scale-105 transition-all duration-200 cursor-pointer'>
                <Link to={item.path} >{item.name}</Link>
              </li>
            ))
          }
        </ul>

        <Link to={`/profile/${user.sub}`} >
          <img src={user.picture} className='w-[5ex] h-[5ex] rounded-lg' alt="" />
        </Link>
      </div>


      <div onClick={() => setNav(!nav)} className='cursor-pointer pr-4 z-10 text-[#dcdcd0] md:hidden  '>
        {
          nav ? <FaTimes size={30} /> : <FaBars size={30} />
        }
      </div>

      {
        nav &&
        <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#6d041ce4]  text-[#dcdcd0]'>
          {
            menu.map(({ id, path, name }) => (
              <li key={id} className='px-4 cursor-pointer capitalize py-6 text-4xl'>
                <Link className='text-[#dcdcd0]' onClick={() => { setNav(!nav) }} to={path} smooth duration={500}> {name} </Link>
              </li>

            ))
          }
        </ul>
      }

    </div>
  )
}

export default NavBar