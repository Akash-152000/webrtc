import React, { useEffect, useState } from 'react'
import {useSocket} from '../providers/Socket'
import {usePeer} from '../providers/Peer'

const Room = () => {
    const {socket} = useSocket();
    const {peer, createOffer} = usePeer();


    const handleNewUserJoined =async (data)=>{
        console.log("entry",data);
        const {email} = data;
        console.log('new user joined room', email);
        const offer = await createOffer();                 // Created offer

        socket.emit('call-user',{email, offer})            // create call-user event and pass email id of the peer and offer
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