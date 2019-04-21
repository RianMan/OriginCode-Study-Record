class Koa{
    constructor(){
        this.middleware = [];
    }

    use(fn){
        this.middleware.push(fn);
    }

    listen(port){
        let http = require('http');
        let middleware = this.middleware;
        http.createServer((req,res)=>{
            let ctx = { req, res};
            next(0)
            function next(idx){
                middleware[idx](ctx,() => next(idx + 1));
            }
        }).listen(port);
    }

}

module.exports = Koa;