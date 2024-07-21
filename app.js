const express = require('express');
const path = require('path');

const app = express();

const http = require('http');

const socketio = require('socket.io');

const server = http.createServer(app);

const io = socketio(server);

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on('send-location', function (location) {
        io.emit('receive-location', {id: socket.id, ...location});
    })
    socket.on('disconnect', function () {
        io.emit('user-disconnected', socket.id);
    })
});

app.get('/', function(req, res){
    res.render('index');
});

server.listen(3000, function (){
    console.log('Server started: http://localhost:3000');
});
