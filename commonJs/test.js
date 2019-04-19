let path = require('path');
let fs = require('fs');
let vm = require('vm');

function Module(id){
    this.id = id;
    this.exports = {};
}

Module.wrapper = [
    "(function (exports, require, module, __filename, __dirname) { ",
    "\n});"
];

// 返回包裹后的函数体
Module.wrap = function(script) {
    return Module.wrapper[0] + script + Module.wrapper[1];
};

// 分解到两个方法给执行
Module._extensions = {
    '.js'(module){
        let fnData = fs.readFileSync(module.id,'utf8');
        let fnStr = Module.wrap(fnData);
        let fn = vm.runInThisContext(fnStr);
        // 可以传参并且执行
        fn.call(module.exports, module.exports,myreq,module);
    },
    '.json'(module){
        let jsonData = fs.readFileSync(module.id,'utf8');
        module.exports = jsonData;
    }
}

// 拿到后缀，判断什么文件去执行
Module.tryModuleLoad = (module) => {
    let extension = path.extname(module.id);
    Module._extensions[extension](module);
}


function myreq(pathname){
    let absPath = path.join(__dirname,pathname);
    // 解析出来绝对路径
    let module = new Module(absPath);
    // 加载模块
    Module.tryModuleLoad(module);
    return module.exports;
}

// 实现一个json文件
// let jsona = myreq('./a.json');

// 实现一个js文件
let jsa = myreq('./a.js');

// console.log(a)
console.log(jsa)