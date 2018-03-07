const express = require('express');
const path = require('path');
const socketIO =require('socket.io');
const http = require('http');

var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage',{
      from:'Admin',
      text:'Welcome to the Chat App',
      createdAt:new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
      from:'Admin',
      text:'New User Joined',
      createdAt:new Date().getTime()
    });

    socket.on('createMessage',(clientMessage)=>{
      console.log('Message',clientMessage);
        io.emit('newMessage',{
          from:clientMessage.from,
          text:clientMessage.text,
          createdAt:new Date().getTime()
        });
    });

    socket.on('disconnect',()=>{
      console.log('User Disconnected');
    });
});

server.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
