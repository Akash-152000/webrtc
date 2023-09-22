import { createContext, useMemo, useContext, useEffect, useCallback, useState } from "react"

const PeerContext = createContext();

export const usePeer = () => {
    return useContext(PeerContext)
}

export const PeerProvider = (props) => {

    const [remoteStream, setRemoteStream] = useState(null)

    const peer = new RTCPeerConnection();
    // const peer = useMemo(() => {
    //     new RTCPeerConnection({        // rtcpeerconnection gives back info about our device
    //         iceServers: [
    //             {
    //                 urls: [
    //                     "stun:stun.l.google.com:19302",
    //                     "stun:stun.fwdnet.net"
    //                 ]
    //             }
    //         ]
    //     }, [])
    // })

    const createOffer = async () => {
        const offer = await peer.createOffer();     // offer is created
        // console.log("offer",offer,peer);
        await peer.setLocalDescription(offer);      // offer needs to be stored on our local state
        return offer
    }

    const createAns = async (offer) => {
        console.log("inside me");
        await peer.setRemoteDescription(offer)      // set the offer from the user to remote desc 
        const answer = peer.createAnswer()         // create answer
        await peer.setLocalDescription(answer)      // set the answer to local desc
        return answer
    }

    const createRemoteAns = async (ans) => {
        await peer.setRemoteDescription(ans)        // save the answer of user in remote
    }

    const sendStream = async (stream) => {
        const tracks = stream.getTracks();
        for (const track of tracks) {
            peer.addTrack(track, stream)
        }
    }

    const handleTrackEvent = useCallback((e)=>{
        const streams = e.streams;
        setRemoteStream(streams[0])
    })

    useEffect(()=>{
        peer.addEventListener('track',handleTrackEvent)

        return ()=>{
            peer.removeEventListener('peer',handleTrackEvent)
        }
    },[peer])

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAns, createRemoteAns, sendStream,remoteStream }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export default PeerProvider;