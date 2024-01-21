import React, { useRef } from 'react'
import CustomTextFiled from '../components/CustomTextFiled'
import { Link } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import CustomTextArea from '../components/CustomTextArea'
import axiosClient from '../axios-client';

function Signup() {

    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const bioRef = useRef()

    const handleKeyPress = () => {
        handleSingUp()
    }

    const handleSingUp = async () => {
        const dataForm = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            bio: bioRef.current.value
        };

        try {
            const response = await axiosClient.post('/auth/register', dataForm);
            if (response.status === 200) {
                const newUser = response.data.newUser
                const id = newUser._id
                const username = newUser.username
                setUser(username, id)
                setToken(response.data.accessToken);
            }
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    }
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='shadow-lg shadow-[#A79086] rounded-lg p-7 bg-[#deded4] flex flex-col w-1/4 justify-center items-center '>
                <div className='text-[4.5ex] font-semibold mb-6'>SING UP</div>

                <CustomTextFiled type="text" placeholder="USERNAME" onKeyUp={null} ref={usernameRef} />

                <CustomTextFiled type="text" placeholder="EMAIL" onKeyUp={null} ref={emailRef} />

                <CustomTextFiled type="password" placeholder="PASSWORD" onKeyUp={null} ref={passwordRef} />

                <CustomTextArea placeholder="BIO" ref={bioRef} />
                <div className='w-full flex justify-start  mb-3 hover:underline underline-offset-2'>
                    <Link to={'/login'}>I already have an account</Link>

                </div>
                <CustomButton onClick={handleSingUp} label={'SING UP'} style={`w-[23ex] h-12 mt-3`} />

            </div>
        </div>
    )
}

export default Signup