import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { Home } from './pages/Home.jsx'


const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<App />}>
          <Route path='' element={<h1>Helllllllo</h1>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/room/:roomId' element={<h1>Welcome</h1>}/>
        </Route>
      )
  )


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
