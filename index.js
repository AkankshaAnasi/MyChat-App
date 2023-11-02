const io = require('socket.io')(8000, {
    cors: {
        origin: "*"
    }
}); 

const users = {};
const cors = require('cors');



io.on('connection', socket =>{
    socket.on('new-user-joined', yourname=>{
        console.log("New user", yourname)
        users[socket.id] = yourname;
        socket.broadcast.emit('user-joined', yourname);

    });
    socket.on('send', message =>{
        
        socket.broadcast.emit('receive', {message: message, yourname:users[socket.id] });

    });

    socket.on('disconnect', message =>{
        
        socket.broadcast.emit('leave', users[socket.id] );
        delete users[socket.id];

    });



})