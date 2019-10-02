const http = require('http');
const Router = require('../router');

const httpMethods = http.METHODS.map(v => v.toLowerCase());

function Application(){
    // this.router 使整个的路由系统
    this.router = new Router(httpMethods);
}

httpMethods.forEach(method => {
    Application.prototype[method] = function(path,...handles){
        this.router[method](path,handles)
    }
})


Application.prototype.use = function(path,handle){
    if(typeof path === 'function'){
        this.router.use('/',handle)
    }else{
        this.router.use(path,handle)
    }
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