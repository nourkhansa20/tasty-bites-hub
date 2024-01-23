import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton"
import LogoutButton from "../components/LogoutButton"
import axiosClient from "../axios-client";
import { useEffect } from "react";
import axios from "axios";
function Login() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={() => getRecipe()}>get</button>
        <br></br>
        <br></br>
        <br></br>
        <LogoutButton />
      </div>
    ) : (
      <LoginButton />
    )
  );
}

export default Login

// import React, { useEffect, useRef } from 'react';
// import { useStateContext } from '../context/ContextProvider';
// import axiosClient from '../axios-client';
// import { useAuth0 } from '@auth0/auth0-react'

// import CustomButton from '../components/CustomButton'
// import CustomTextFiled from '../components/CustomTextFiled'
// import LoginButton from '../components/LoginButton'

// import { Link } from 'react-router-dom'

// function Login() {
//   const { setToken, setUser, currentUser } = useStateContext();

//   // const emailRef = useRef();
//   // const passwordRef = useRef();

//   // const handleLogin = async () => {
//   //   const dataForm = {
//   //     email: emailRef.current.value,
//   //     password: passwordRef.current.value,
//   //   };

//   //   try {
//   //     const { data } = await axiosClient.post('/auth/login', dataForm);
//   //     const userdb = await axiosClient.get(`/user/${emailRef.current.value}`)
//   //     const username = userdb.data.username
//   //     const id = userdb.data._id
//   //     setUser(username, id)
//   //     console.log(currentUser)
//   //     console.log(username)

//   //     setToken(data.accessToken);
//   //   } catch (error) {
//   //     console.error('Error during login:', error.message);
//   //   }
//   // };

//   // const handleKeyPress = (e) => {
//   //   if (e.key === 'Enter') {
//   //     handleLogin();
//   //   }
//   // };




//   const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently, isLoading } = useAuth0();
//   const handleGetAccessToken = async () => {
//     try {
//       const accessToken = await getAccessTokenSilently();
//       console.log('Access Token:', accessToken);
//     } catch (error) {
//       console.error('Error getting access token:', error);
//     }
//   };

//   useEffect(() => {
//     console.log(isAuthenticated)
//   })

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return (
//     <>
//       <div>
//         {isAuthenticated ? (
//           <>
//             <p>Welcome, {user.name}!</p>
//             <p>Email: {user.email}</p>
//             <button onClick={handleGetAccessToken}>Get Access Token</button>
//             <button onClick={() => logout()}>Logout</button>
//           </>
//         ) : (
//           <LoginButton />
//         )
//         }
//       </div>
//     </>
//     // <div className='w-full h-screen flex justify-center items-center'>
//     //   <div className='shadow-lg shadow-[#A79086] rounded-lg p-7 bg-[#deded4] flex flex-col w-1/4 justify-center items-center '>
//     //     <div className='text-[4.5ex] font-semibold mb-6'>Login</div>

//     //     <CustomTextFiled type="text" placeholder="Email" onKeyUp={handleKeyPress} ref={emailRef} />

//     //     <CustomTextFiled type="password" placeholder="Password" onKeyUp={handleKeyPress} ref={passwordRef} />

//     //     <div className='w-full flex justify-end  mb-3 hover:underline underline-offset-2'>
//     //       <Link to={'/singup'}>Create new account</Link>

//     //     </div>

//     //     <CustomButton onClick={handleLogin} label={'Login'} style={`w-[23ex] h-12 mt-5`} />

//     //   </div>
//     // </div>

//   );
// }

// export default Login;
