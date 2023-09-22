const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const io = new Server({ cors: true });
const app = express();
app.use(bodyParser.json());

const emailToSocket = new Map(); // create this to map email id to room id
const socketToEmail = new Map(); // create this to map email id to room id

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    // on Join room event you will recieve data from client side
    const { roomId, email } = data; // destructure roomid and email sent from front end
    emailToSocket.set(email, socket.id); // map email with id of the socket
    socketToEmail.set(socket.id,email);  // map id with email of the socket
    console.log(emailToSocket);
    socket.join(roomId); // join a socket room with roomId

    socket.emit("joined-room", { roomId }); // server says joined-room now we can listen this on client side

    socket.broadcast.to(roomId).emit("user-joined", { email }); //when user joins the room, broadcast this to everyone in that room
  });

  socket.on("call-user", (data) => {
    const { email, offer } = data;
    const fromEmail = socketToEmail.get(socket.id)
    const socketId = emailToSocket.get(email)
    socket.to(socketId).emit('incomming-call',{from:fromEmail,offer})
  });
});

app.listen(8000, () => console.log("Server running at port 8000"));
io.listen(8001);
