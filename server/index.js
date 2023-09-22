const express = require('express')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')

const io = new Server({cors:true});
const app = express();
app.use(bodyParser.json())

const emailToSocket = new Map();               // create this to map email id to room id

io.on('connection',(socket)=>{
    console.log("User Connected");
    socket.on('join-room',(data)=>{            // on Join room event you will recieve data from client side
        const {roomId, email} = data;          // destructure roomid and email sent from front end
        console.log(roomId,email);
        emailToSocket.set(email, socket.id)    // map email with id of the socket
        socket.join(roomId)                    // join a socket room with roomId
        
        socket.broadcast.to(roomId)
        .emit('user-joined',{email})  //when user joins the room, broadcast this to everyone in that room
    })
})

app.listen(8000,()=>console.log("Server running at port 8000"))
io.listen(8001)