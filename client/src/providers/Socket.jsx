import { createContext, useMemo } from 'react';
import { io } from 'socket.io-client'


const SocketContext = createContext();

const Socketprovider = (props) => {

    const socket = useMemo(() => io({
        host:'localhost',
        port:8001
    }), [])
    return (
        <Socketprovider.Provider value={{ socket }}>
            {props.children}
        </Socketprovider.Provider>
    )
}

export default Socketprovider;