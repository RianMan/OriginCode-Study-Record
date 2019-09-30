const Layer = require('./layer');
const Route = require('./route');
//存放着所有的层
function Router(){
    this.stack = [];
    this.layer = new Layer();
    this.out = (res)=>{
        res.end = 'not found'
    }
}
Router.prototype.route = function(path){
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

Router.prototype.get = function(path,handle){
    let route = this.route(path);
    // 在route上也会产生一层
    route.get(handle);
}

Router.prototype.handle_request = function(req,res,out){
    let idx = 0;
    let pathname = req.url;
    let next = () => {
        if(idx === this.stack.length) return out();
        let current = this.stack[idx++];
        if(current.match(pathname)){
            return current.handle(req,res,next);
        }else{
            next();
        }
    }
    next();
}

module.exports = Router;