import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {Logo, Button, Input} from './index.js'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import  {authservice}  from "../appwrite/authservice.js";
import service from '../appwrite/dbService.js'
import { login as authLogin } from "../store/authSlice.js";
import { useSelector } from "react-redux";

function Login() {
    const [error, setError] = useState('');
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()

    const login = async(data) => {
        try {
            const session = await authService.login(data)
            
            if(session){
            const userData = await authService.getCurrentUser();
            if(userData) dispatch(authLogin(userData));
            navigate('/')
            }
        } catch (err)
        {
            setError(err.message)
        }

    }



  return (
    <div className="flex justify-center flex-wrap bg-gray-100">
        <div className="w-full ">
            <Logo/>
        </div>
        <p>Don't have an account?</p>
        <Link className="" to='/signup'>
            Signup
        </Link>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
          <Input label = "Email: " placeholder = "Enter your email here" type = "email" 
           {...register('email', {
            required: true,
            validate: {
                matchPattern: (value) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) || "Email adress must be valid"
            }
           })}></Input>
           
            <Input label = "password: " placeholder = "Enter your password here" type = "password" 
           {...register('password', {
            required: true,
            validate: {
                matchPattern: (value) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) || "Email adress must be valid"
            }
           })}></Input>

           <Button type= "submit" className = 'w-full'>
                Login
           </Button>
          </div>
        </form>

    </div>
  )
}

export default Login
