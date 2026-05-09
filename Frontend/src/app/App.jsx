import { useState } from 'react'
import { RouterProvider } from 'react-router'
// import { routes } from './app.routes.jsx'
import { routes } from './app.routes'
import "./App.css"
// import "./Source.css"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hook/useAuth'

function App() {
  const {handleGetMe} = useAuth()

  const user = useSelector(state=>state.auth.user)
  console.log(user)

  useEffect(()=>{
    handleGetMe()
    
  },[])
  console.log(user)



 

  return (
    <>
       <RouterProvider router={routes}  />
    </>
  )
}

export default App
