const express = require('express');
const path = require('path');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname,'../')))

app.get('/',(req,res)=>{
    res.sendFile('index.html')
})
io.on('connection', (socket) => { 
    console.log('a user connected');
    socket.on('chat message', function(msg){
        const time = new Date().toLocaleTimeString();
        const date = new Date().toLocaleDateString();
        io.emit('chat message', msg + ' ' + date + ' ' + time);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

server.listen(9920);