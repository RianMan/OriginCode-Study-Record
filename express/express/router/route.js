const Layer = require('./layer');
// 存放所有的handle
function Route(){
    this.stack = [];
}
Route.prototype.get = function(handle){
    const layer = new Layer('',handle);
    layer.method = 'get';
    this.stack.push(layer) 
}
Route.prototype.dispatch = function(req,res,out){
    let idx = 0;
    let method = req.method.toLowerCase();
    let next = () => {
        if(idx === this.stack.length) return out();
        let current = this.stack[idx++];
        if(current.method === method){
            current.handle(req,res,next);
        }else{
            next();
        }
    }
    next();
}

module.exports = Route;