import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Protected({authentication = true , children}) {
    const [loading, setLoading] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate()

    // useEffect(()=>{
    //     if(authStatus === true){
    //         navigate("/")

    //     }
    //     else if(authStatus === false){
    //         navigate("/login")
    //     }
    //     setLoading(false)
    // },[navigate, authStatus, loading])

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    },[navigate, authStatus, loading])

  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
