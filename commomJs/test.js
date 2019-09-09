const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(id){
    this.id = id;
    this.exports = {};
}
Module.fnStrArr = [
    '(function(module,exports,__dirname,__filename){',
    '})'
]

Module.resolve = {
    '.js': function(module){
        let content = fs.readFileSync(module.id,'utf8');
        let fnStr = Module.fnStrArr[0] + content + Module.fnStrArr[1];
        vm.runInThisContext(fnStr).call(module.exports,module,myRequire,module);
        return module.exports;
    },
    '.json': function(module){

    },
}

Module.prototype.load = function() {
    const ext = path.extname(this.id);
    return Module.resolve[ext](this);
}

function myRequire(rpath){
    const absPath = path.resolve(__dirname,rpath);
    let pathFile;
    let keysArr = Object.keys(Module.resolve);
    for (let index = 0; index < keysArr.length; index++) {
        const e = keysArr[index];
        pathFile = absPath + e;
        try {
            fs.accessSync(pathFile);
            break;
        } catch (error) {
            throw '文件不存在'
        }
    };
    const m = new Module(pathFile);
    m.load();
    return m.exports;    
}

const a = myRequire('./a');
console.log(a);
