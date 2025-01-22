import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import { AuthLayout } from './components/index.js'
import store from './store/store.js'



const router = createBrowserRouter(
  
   [
     {
      path:'/',
      element: <App/>,
      children:[
        {
          path:'/',
          element: <Home/>
        },
        {
          path: "/login",
          element: (
              <AuthLayout authentication={false}>
                  <Login />
              </AuthLayout>
          ),
      },
      {
        path: "/sign-up",
        element: (
          <AuthLayout authentication= {false}>
            <SignUp/>
          </AuthLayout>
        )
      },
      {
        path:"/allpost",
        element:(
          <AuthLayout authentication = {true}>
            {" "}
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/addpost",
        element:(
          <AuthLayout authentication = {true}>
            {" "}
            <AllPosts/>
          </AuthLayout>
        )
      },
      {
        path:"/editpost/:slug",
        element:(
          <AuthLayout authentication = {true}>
            {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />,
      }
     

      ]

    }
  ]
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
