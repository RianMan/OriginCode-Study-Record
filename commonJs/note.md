#实现一个require方法
---
+ 首先通过阅读源代码去看看大概实现思路是怎么样的。
    1. 首先我们通过传入的相对路径去着手
        > 源码通过这个方法进入（id就是传入的字符串） Module._load(id, this, /* isMain */ false);
    
    2. 通过传入的相对路径可以拼出一个绝对路径
        > 源码返回一个绝对路径 Module._resolveFilename(request, parent, isMain);
        

    3. 之后通过这个id来创建一个Module对象
        > 对象上有两个重要的属性，id和exports 
        ```
            new Module(filename, parent);
            function Module(id, parent) {
                this.id = id;
                this.exports = {};
                this.parent = parent;
                updateChildren(parent, this, false);
                this.filename = null;
                this.loaded = false;
                this.children = [];
            }
            module.load(filename)
        ```
    4. 通过路径可以拿到相应的文件类型， .js,.json,.node
        > Module._extensions[extension](this, filename);
    
    5. 如果读取是js文件
        > 通过此方法去编译字符串代码
            传入content和filename给complie函数  
            module._compile(stripBOM(content), filename);  
            调用这个方法去包裹函数执行<br />
            ```
            Module.wrap(content);<br />  
            Module.wrap = function(script) {
                return Module.wrapper[0] + script + Module.wrapper[1];
            };<br />  
            Module.wrapper = [
                "(function (exports, require, module, __filename, __dirname) { ",
                "\n});"
            ]
            ```
    6. 通过第五步拿到执行的代码块
        > compiledWrapper = vm.runInThisContext(wrapper)
---
+ module.exports 和 exports的区别？
    1. exports是module.exports的别名，但是不能直接改变exports的对象引用,
    因为不会影响module.exports对象的值<br />  
    module.exports = exports = {}