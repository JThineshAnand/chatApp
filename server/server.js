const express = require('express');
const path = require('path');
const socketIO =require('socket.io');
const http = require('http');
const {generateMessage}=require('./utils/message');
const {generateLocationMessage}=require('./utils/message');

var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.emit('newMessage',generateMessage('Admin',
    'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin',
    'New User Joined'));

    socket.on('createMessage',(clientMessage,callback)=>{
      console.log('Message',clientMessage);
        io.emit('newMessage',generateMessage(clientMessage.from,
          clientMessage.text));
          callback('At Server');
    });
    socket.on('createLocationMessage',(coords)=>{
      console.log(coords);
      io.emit('newLocationMessage',generateLocationMessage('Admin',
        `${coords.latitude}`,`${coords.longitude}`));
    });

    socket.on('disconnect',()=>{
      console.log('User Disconnected');
    });
});

server.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
