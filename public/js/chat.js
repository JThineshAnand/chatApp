var socket = io();
socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search);



  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href='/';
    }else{
      console.log('No error');
    }
  });


});

socket.on('updatedUserList',function(users) {
  console.log(users);
  var ol = jQuery('<ol id="userlist"></ol>');
  for (user in users){
    ol.append(jQuery('<li></li>').text(users[user]));
  };
  jQuery('#userlist').remove();
  jQuery('#users').append(ol);
});

function scrolltoBottom(){
  var message = jQuery('#chatMessages');
  var newMessage = message.children('li:last-child');
  var clientHeight = message.prop('clientHeight');
  var scrollHeight = message.prop('scrollHeight');
  var scrollTop = message.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight+newMessageHeight+lastMessageHeight+scrollTop>=scrollHeight){
    message.scrollTop(scrollHeight);
  }

}



socket.on('disconnect',function(){
  //console.log('Server Disconnected');


});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#messageTemplate').html();
  var html = Mustache.render(template,{
    from:message.from,
    text:message.text,
    time:formattedTime
  });
  jQuery('#chatMessages').append(html);
  scrolltoBottom();
});

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#locationmessageTemplate').html();
  var html = Mustache.render(template,{
    from:message.from,
    url:message.url,
    time:formattedTime

  });
    jQuery('#chatMessages').append(html);
    scrolltoBottom();
});
var messageBox =jQuery("[name = message]");
jQuery('#message-form').on('submit',function(event){
  event.preventDefault();
  socket.emit('createMessage',{

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
