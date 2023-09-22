const { createContext, useMemo, useContext } = require("react");

const PeerContext = createContext();

export const usePeer = () =>{
        return useContext(PeerContext)
}

export const PeerProvider = (props)=>{

    const peer = useMemo(()=>{
        const peer = new RTCPeerConnection({        // rtcpeerconnection gives back info about our device
            iceServers:[
                {
                    urls:[
                        "stun:stun.l.google.com:19302",
                        "stun:global.stun.twilio.com:3478"
                    ]
                }
            ]
        },[])
    })

    const createOffer =async ()=>{
        const offer = await peer.createOffer();     // offer is created
        await peer.setLocalDescription(offer);      // offer needs to be stored on our local state
        return offer
    }


    return(
        <PeerContext.Provider value={{peer, createOffer}}>
            {props.children}
        </PeerContext.Provider>
    )
}