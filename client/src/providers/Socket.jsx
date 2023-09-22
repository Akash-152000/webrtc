import { createContext, useMemo, useContext } from 'react';
import { io } from 'socket.io-client'


const SocketContext = createContext();

export const useSocket =()=> {
    return useContext(SocketContext)       // use this custom hook to use the context
}

const SocketProvider = (props) => {

    const socket = useMemo(() => io('http://localhost:8001'), [])
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;