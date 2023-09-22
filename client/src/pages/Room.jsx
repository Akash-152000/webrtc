import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket'
import { usePeer } from '../providers/Peer'
import ReactPlayer from 'react-player'

const Room = () => {
    const { socket } = useSocket();
    const { peer, createOffer, createAns, createRemoteAns } = usePeer();
    const [myStream,setMyStream] = useState(null)


    const handleNewUserJoined = useCallback(async (data) => {
        const { email } = data;
        console.log('new user joined room', email);
        const offer = await createOffer();                 // Created offer
        console.log('offer',offer);

        socket.emit('call-user', { email, offer })            // create call-user event and pass email id of the peer and offer
    },[socket, createOffer])


    const handleIncomingCall = useCallback(async (data)=>{
        console.log("reached here");
        const {from, offer} = data
        console.log('You have a connection offer from',from,offer);
        const ans = await createAns(offer)
        socket.emit('call-accepted',{email:from, ans})
    },[socket, createAns])

    const handleCallAccepted = useCallback(async (data)=>{
        const {ans} = data
        console.log("Call got accepted", ans);
        await createRemoteAns(ans)
    },[socket])

    const getUserMediaStream = useCallback(async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true,video:true});
        setMyStream(stream)
    },[])

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incomming-call',handleIncomingCall);
        socket.on('call-accepted', handleCallAccepted)

        return ()=>{
            socket.off('user-joined',handleNewUserJoined)
            socket.off('incomming-call',handleIncomingCall)
            socket.off('call-accepted', handleCallAccepted)
        }
    }, [handleNewUserJoined,handleIncomingCall,handleCallAccepted,socket])

    useEffect(()=>{
        getUserMediaStream();
    },[getUserMediaStream])

    return (
        <div>
            <h1>Room Page</h1>
            <ReactPlayer url={myStream} playing muted/>
        </div>
    )
}

export default Room