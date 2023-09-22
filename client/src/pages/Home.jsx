import React, { useState } from 'react'
import {useSocket} from '../providers/Socket'

export const Home = () => {
  const {socket} = useSocket()

  const [email,setEmail] = useState('')
  const [roomId,setRoomId] = useState('')

  const handleRoomJoin=()=>{
    socket.emit('join-room',{email,roomId})
  }


  return (
    <div className='home-container'>
        <div className='container'>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder='Enter your email' />
            <input value={roomId} onChange={e=>setRoomId(e.target.value)} type="roomId" placeholder='Enter Room Id' />
            <button onClick={handleRoomJoin}>Enter Room</button>
        </div>
    </div>
  )
}
