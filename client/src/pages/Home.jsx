import React, { useEffect, useState } from 'react'
import {useSocket} from '../providers/Socket'
import {useNavigate} from 'react-router-dom'

export const Home = () => {
  const {socket} = useSocket()
  const navigate = useNavigate()

  const [email,setEmail] = useState('')
  const [roomId,setRoomId] = useState('')

  const handleRoomJoin=()=>{
    socket.emit('join-room',{email,roomId})
  }

  useEffect(()=>{
    socket.on('joined-room',({roomId})=>{
      navigate(`/room/${roomId}`)
    })
  },[socket])

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
