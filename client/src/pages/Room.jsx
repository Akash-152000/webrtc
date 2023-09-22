import React, { useEffect, useState } from 'react'
import {useSocket} from '../providers/Socket'

const Room = () => {
    const {socket} = useSocket()


    const handleNewUserJoined =(data)=>{
        console.log("entry",data);
        const {email} = data
        console.log('new user joined room', email);
    }

    useEffect(()=>{
        socket.on('user-joined',handleNewUserJoined)
    },[socket])

  return (
    <div>
        <h1>Room PAge</h1>
    </div>
  )
}

export default Room