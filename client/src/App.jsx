
import { Outlet } from 'react-router-dom'
import './App.css'
import SocketProvider from './providers/Socket'
import PeerProvider from './providers/Peer'

function App() {
  return (
    <>

      <SocketProvider>
        <PeerProvider>
          <Outlet />
        </PeerProvider>
      </SocketProvider>
    </>
  )
}

export default App
