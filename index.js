var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var count = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  count++;
  io.to(socket.id).emit("put nickname", count);
  socket.broadcast.emit('hi');
  console.log('a user connected');
  console.log(count);
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('bye');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
