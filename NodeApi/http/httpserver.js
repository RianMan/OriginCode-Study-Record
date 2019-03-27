let http = require('http');
// http作为客户端的作用：
//     1. 写爬虫
//     2. node中中间层
let options = {
    host: 'localhost',
    port:  8080,
    method: 'GET'
};
let req = http.request(options);
// let server = http.createServer((req,res)=>{
//     req.on('data',(data)=>{
//         console.log(data);
//     })
//     res.write('hello');
//     res.write('world');
//     res.end('end~');
// });
// server.listen(9989,()=>{
//     console.log('http://localhost:9989')
// })