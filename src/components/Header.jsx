import React from 'react'
import Container from './Container/Container'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

function Header() {
    const authStatus = useSelector(state => state.auth.status)
    // console.log(authStatus) 
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active:true
        },
        {
            name: 'Login',
            slug: '/login',
            active:!authStatus
        },
        {
            name: 'SignUp',
            slug: '/sign-up',
            active:!authStatus
        },
        {
            name: 'All-Posts',
            slug: '/all-posts',
            active:authStatus
        },
        {
            name: 'Add-Post',
            slug: '/add-post',
            active:authStatus
        },
        // logout will be rendered on conditional basis
       
    ]
  return (
    <Container>
        <div>
            <div className='m-2'>
                <Logo width='70px'/>
            </div>
           <ul className='ml-auto flex'>
                {navItems.map((item) => item.active? (
                    <li  key={item.name}>
                        <button onClick={()=> navigate(item.slug)}
                         className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                        >
                            {item.name}
                        </button>
                    </li>
                ):(null))}
           </ul>

           <div>
                {authStatus && (
                    <li>
                        <LogoutBtn/>
                    </li>
                ) }
           </div>

        </div>
    </Container>
  )
}

export default Header

