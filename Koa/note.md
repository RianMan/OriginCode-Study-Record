#koa的学习笔记
---
1. koa的基本实现
    > ctx集成了原生的request和response对象,内部定义了use,listen方法和一个middleware函数数组, 

    ```
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
    ```

2. koa的好处
    > 迷你,包小,可拓展性强,二次开发好,egg.js , think.js
    > 还有一个洋葱模型可以方便统计服务器端连接时间

3. koa的中间件和express的中间件区别
    > koa的中间件返回的是一个promise,支持异步同步,
    > 虽然都是通过一个中间层的函数不断递归,可能koa的判断没有那么多,因为他只有一个use方法,而不像express有那么的判断条件

4. 常见与koa搭档开发的库
    - koa-router ，用来定义路由
    - koa-bodyparser，用来解析请求相关的参数
    - koa-static， 搭建一个静态资源服务器
