const Layer = require('./layer');
const http = require('http');

const httpMethods = http.METHODS.map(v => v.toLowerCase());
// 存放所有的handle
function Route(){
    this.stack = [];
}

httpMethods.forEach(method => {
    Route.prototype[method] = function(handle){
        const layer = new Layer('',handle);
        layer.method = method;
        this.stack.push(layer) 
    }
})


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