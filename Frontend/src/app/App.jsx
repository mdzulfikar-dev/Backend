import { useState } from 'react'
import { RouterProvider } from 'react-router'
// import { routes } from './app.routes.jsx'
import { routes } from './app.routes'
import "./App.css"
// import "./Source.css"

function App() {
 

  return (
    <>
       <RouterProvider router={routes} />
    </>
  )
}

export default App
