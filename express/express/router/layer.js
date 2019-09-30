// 存放一层
function Layer(path,handle){
    this.path = path;
    this.handle = handle;
}

Layer.prototype.match = function(path){
    return this.path === path;
}

module.exports = Layer;