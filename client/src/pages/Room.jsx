import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer'

const Room = () => {
    const { socket } = useSocket();
    const { peer, createOffer } = usePeer();



    const handleNewUserJoined = useCallback(async (data) => {
        console.log("entry", data);
        const { email } = data;
        console.log('new user joined room', email);
        const offer = await createOffer();                 // Created offer
        // console.log('offer',offer);

        socket.emit('call-user', { email, offer })            // create call-user event and pass email id of the peer and offer
    },[socket, createOffer])


    const handleIncomingCall = useCallback((data)=>{
        const {from, offer} = data
        console.log(from,offer);
    },[socket])

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incomming-call',handleIncomingCall)

        return ()=>{
            socket.off('user-joined',handleNewUserJoined)
            socket.off('incomming-call',handleIncomingCall)
        }
    }, [handleNewUserJoined,socket])

    return (
        <div>
            <h1>Room Page</h1>
        </div>
    )
}

export default Room