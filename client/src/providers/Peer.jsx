import { createContext, useMemo, useContext } from "react"

const PeerContext = createContext();

export const usePeer = () => {
    return useContext(PeerContext)
}

export const PeerProvider = (props) => {

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

    const createAnswer = async (offer)=>{
        await peer.setRemoteDescription(offer)
        const answer = offer.createAnswer() 
        await peer.setLocalDescription(answer)
        return answer
    }

    return (
        <PeerContext.Provider value={{ peer, createOffer }}>
            {props.children}
        </PeerContext.Provider>
    )
}

export default PeerProvider;