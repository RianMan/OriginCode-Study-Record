let net = require('net');
let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let { promisify } = require('util');
let stat = promisify(fs.stat);
let server = http.createServer((req,res)=>{
    let { pathname } = url.parse(req.url);
    let pathName = path.join(__dirname,pathname);
    fs.stat(pathName,(err,stats)=>{
        if(stats){
            res.end(fs.cre);
        }
    });
});
server.listen(9988,()=>{
    console.log('服务启动');
});
// let server = net.createServer(function(socket){
//     socket.setEncoding('utf-8');
//     socket.on('data',(data)=>{
//         let msg = data.replace('\r\n','');
//         console.log(msg);
//     });
//     socket.write(__dirname)
// });
// server.on('error',(e)=>{
//     console.log(e);
// })
// server.listen(8124,()=>{
//     console.log(11)
// })