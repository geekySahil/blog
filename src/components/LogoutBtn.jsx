import { Container } from 'postcss'
import React from 'react'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { authservice } from '../appwrite/authservice'
import { logout } from '../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const handleLogout = () => {
        authservice.logout();
        dispatch(logout())
        
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogout}>
        Logout
    </button>
  )
}

export default LogoutBtn
