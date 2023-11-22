const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.resolve("./public")));
io.on("connection", (socket) => {
  console.log("A new user connection successfully");
  socket.on("chat message", (msg) => {
    io.emit('chat message', msg);
  });
});
app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(9000, function () {
  console.log("the server is on 9000");
});
