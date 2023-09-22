
import { Outlet } from 'react-router-dom'
import './App.css'
import SocketProvider from './providers/Socket'

function App() {
  return (
    <>
    <SocketProvider>
      <Outlet/>
    </SocketProvider>
    </>
  )
}

export default App
