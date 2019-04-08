let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let handlebars = require('handlebars'); 
let { promisify } = require('util');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let mime = require('mime');

let server = http.createServer(request);

function list(){
    let tpl =  fs.readFileSync('./tpl.html',{encoding:'utf-8'});
    var template = handlebars.compile(tpl);
    return template;
}
async function request(req,res){
    let reqPath = req.url;
    if(reqPath === '/favicon.ico') return;
    let filePath = path.join(__dirname,'/src',reqPath);
    let stats = await stat(filePath);
    if(stats.isDirectory()){
        let files = await  readdir(filePath);
        let data = files.map(v => {
            let obj ={};
            let childPath = path.join(reqPath,v);
            obj.src = childPath;
            obj.name = v;
            return obj;
        });
        const tplObj = {title:filePath,data}
        let html = list()(tplObj);
        res.end(html);       
    }else{
        res.setHeader('content-Type',mime.getType(filePath));     
        fs.createReadStream(filePath).pipe(res);
    }
}

// list();
server.listen(9999,()=>{console.log('localhost:9999')})