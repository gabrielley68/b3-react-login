var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', msg => {
        console.log('message: ' + msg);
        msg.date = Date.now();
        io.emit('chat message', msg)
    })
});


http.listen(4000, function(){
    console.log('listening on *:4000');
});