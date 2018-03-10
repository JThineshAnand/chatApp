var socket = io();
socket.on('connect',function(){
  console.log('Server Connected');


});

socket.on('disconnect',function(){
  console.log('Server Disconnected');
});

socket.on('newMessage', function(message){
  console.log('New Message received', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#chatMessages').append(li);

});

socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location </a>');
    li.text(`${message.from} `);
    a.attr('href',`${message.url}`);
    li.append(a);
    jQuery('#chatMessages').append(li);
});
var messageBox =jQuery("[name = message]");
jQuery('#message-form').on('submit',function(event){
  event.preventDefault();
  socket.emit('createMessage',{
      from:'User',
      text: messageBox.val()
  },function(){
    messageBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  locationButton.attr('disabled','disabled').text('Sending Location..');
  if(!navigator.geolocation){
    return alert('Geolocation not supported in your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send Location');
    console.log(position);
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Cannot get the location');
  });

});
