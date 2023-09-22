import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import Room from './pages/Room.jsx'


const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path='/' element={<App />}>
          <Route path='' element={<Home/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
        </Route>
      )
  )


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
