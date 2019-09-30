const http = require('http');
const Router = require('../router');

function Application(){
    this.router = new Router();
}

Application.prototype.get = function(path,handle){
    this.router.get(path,handle)
}


Application.prototype.listen = function(...args){
    let server = http.createServer((req,res)=>{
        function done(){
            return res.end('not found')
        }
        this.router.handle_request(req,res,done)
    });
    let [port,...agrs] = args;
    server.listen(port,agrs);
}

module.exports = Application;