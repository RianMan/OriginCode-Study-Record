const Layer = require('./layer');
const Route = require('./route');
const http = require('http');

const httpMethods = http.METHODS.map(v => v.toLowerCase());

//存放着所有的层
function Router(){
    this.stack = [];
    this.layer = new Layer();
    this.out = (res)=>{
        res.end = 'not found'
    }
}
// 新建一层
Router.prototype.route = function(path){
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

Router.prototype.use = function(path,handle){
    let layer = new Layer(path,handle);
    layer.method = 'use'
    this.stack.push(layer);
    // 在route上也会产生一层
}

httpMethods.forEach(method => {
    Router.prototype[method] = function(path,handles){
        handles.forEach(handle => {
            let route = this.route(path);
            // 在route上也会产生一层
            route[method](handle);
        })
    }
})


Router.prototype.handle_request = function(req,res,out){
    let idx = 0;
    let pathname = req.url;
    let next = () => {
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.method === 'use'){
            if(layer.path === '/'){
                return layer.handle(req,res,next);
            }else{
                layer.match(pathname) ? layer.handle(req,res,next) : next();
            }
        }else{
            if(layer.match(pathname)){
                return layer.handle(req,res,next);
            }else{
                next();
            }
        }
    }
    next();
}

module.exports = Router;