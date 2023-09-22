import React from 'react'
import {useSocket} from '../providers/Socket'

export const Home = () => {
  const {socket} = useSocket()
  console.log(socket);

  socket.emit('join-room',{roomId:'1',email:'a@export.com'})

  return (
    <div className='home-container'>
        <div className='container'>
            <input type="email" placeholder='Enter your email' />
            <input type="roomId" placeholder='Enter Room Id' />
            <button>Enter Room</button>
        </div>
    </div>
  )
}
