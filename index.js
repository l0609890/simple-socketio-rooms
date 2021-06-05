const express = require('express')
const app = express();
const server = app.listen(3000, () => console.log("listening on port 3000"))
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

app.get("/chat", (req, res) => {
  res.sendFile(__dirname + '/chat.html');
})

io.on('connection', (socket) => {
  socket.on('send message', (msg, room) => {
    if (room === "") {
      socket.broadcast.emit("chat message", msg);
    } else {
      console.log("hit", room)
      socket.to(room).emit("chat message", msg);
    }
  });

  socket.on("join room", room => {
    socket.join(room)
  })
});

