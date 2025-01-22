import React, { useState, useEffect } from 'react'
import { authservice } from './appwrite/authservice';
import { login, logout } from './store/authSlice';
import {useDispatch} from "react-redux"
import Header  from './components/Header';
import Footer from './components/Footer'
import './App.css'
import { Outlet } from 'react-router-dom';
import store from './store/store.js'


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(()=>{
  
    authservice.getCurrentUser()
    .then((userData) => {
      if(!userData){
        throw error
      }else{
        dispatch(login({userData}))
      }
    }).finally(()=>setIsLoading(false))
    
  }, [])

  return !isLoading ? (
    <div className='h-screen flex bg-gray-500 flexwrap '>
      <div className='w-full block justify-center'>
        <Header/>
          <main>
           <Outlet/>
          </main>
        <Footer/>
      </div>
    </div>
  ):null



}

export default App
