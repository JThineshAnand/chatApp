const express = require('express');
const path = require('path');
const socketIO =require('socket.io');
const http = require('http');
const {generateMessage}=require('./utils/message');
const {generateLocationMessage}=require('./utils/message');
const {realstring}=require('./utils/validation');
const {Users}=require('./utils/users');


var app = express();
app.use(express.static(path.join(__dirname,'../public')));
var port = process.env.PORT||3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();



io.on('connection',(socket)=>{
    //console.log('New User Connected');
    socket.on('join',(params,callback)=>{
      if(!realstring(params.displayName) || !realstring(params.roomName)){
        callback('Display name and Room name are required');
      }else {

        socket.join(params.roomName);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.displayName,params.roomName);
        io.to(params.roomName).emit('updatedUserList',users.getUserlist(params.roomName));

        socket.emit('newMessage',generateMessage('Admin',
        'Welcome to the Chat App'));

        socket.broadcast.to(params.roomName).emit('newMessage',generateMessage('Admin',
        `${params.displayName} joined the Chat`));
        callback();
      }
    });


    socket.on('createMessage',(clientMessage,callback)=>{
      var user = users.getUser(socket.id);
      if(user && realstring(clientMessage.text)){
        io.to(user.room).emit('newMessage',generateMessage(`${user.name}`,
          clientMessage.text));
        }
          callback();
    });
    socket.on('createLocationMessage',(coords)=>{
      var user = users.getUser(socket.id);
      //console.log(coords);
      if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(`${user.name}`,
        `${coords.latitude}`,`${coords.longitude}`));}

    });

    socket.on('disconnect',()=>{
      //console.log('User Disconnected');
      var user = users.removeUser(socket.id);
      if(user){
        io.to(user.room).emit('updatedUserList',users);
        io.to(user.room).emit('newMessage',generateMessage(user.displayName,`${user.name} has left the ${user.room}`));
      }
    });
});

server.listen(port,()=>{
  console.log(`Server is running on ${port}`);
});
