const express = require('express');
const path = require('path');
const socketio =require('socket.io');
const http = require('http');

var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketio(server);

io.on('connection',(socket)=>{
    console.log('New User Connected');
    socket.on('createMessage',(clientMessage)=>{
      console.log('Message',clientMessage);
    });
    socket.emit('newMessage',{from:'Server',text:'Hiii'});

    socket.on('disconnect',()=>{
      console.log('User Disconnected');
    });
});

server.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
