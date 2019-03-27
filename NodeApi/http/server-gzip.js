let net = require('net');
let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let zlib = require('zlib');
let { promisify } = require('util');
let mime = require('mime');
// 解决content-type

let stat = promisify(fs.stat);
let server = http.createServer(sendData);
async function sendData(req,res){
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname,pathname);
    let acceptEncodingStr = req.headers['accept-encoding'];
    try {
        let statObj = await stat(filepath);    
        res.setHeader('content-Type',mime.getType(pathname));     
        if(acceptEncodingStr.match(/\bgzip\b/)){
            console.log('压缩文件');
            res.setHeader('Content-Encoding','gzip');
            fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
        }
    } catch (error) {
        res.statusCode = 404;
        res.end();
    }
}
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