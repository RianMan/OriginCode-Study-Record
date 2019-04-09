let http = require('http');
let url = require('url');
// 返回一个函数，函数返回一个app对象
function application(){
    app = function(req,res){
        let { pathname } = url.parse(req.url);
        let methodRequest = req.method.toLocaleLowerCase();
        let index = 0;
        function next(){
            if(index >=routes.length) return res.end('404');
            const element = routes[index++];
            if(element.method === 'use'){
                // 判断中间件的路由是否匹配，路径是否一致，不一致则继续调用中间价
                if(pathname === element.path || element.path === '/' || pathname.startsWith(path+'/')){
                    return element.handle(req,res,next);
                }else{
                    next();
                }
            }else{
                if(element.path.params){
                    // 判断为带参数的路由，匹配到然后返回一个参数的集合
                    let match = pathname.match(element.path);
                    if(match){
                        let [,...list] = match;
                        let { params } = element.path;
                        // 通过reduce返回一个对象
                        let a = params.reduce((memo,cur,index)=>{memo[cur] = list[index];return memo },{});
                        req.params = a;
                        // 直接挂载在req这个对象上
                        return element.handle(req,res,next);
                    }
                }
                if(pathname === element.path && methodRequest===element.method){
                    return element.handle(req,res,next);
                }
                next();
            }
        }
        next();
        res.end(`cannot ${methodRequest} ${pathname}`)
        console.log(pathname);
    }

    let routes = [];
    // 循环遍历方法，使得每一种请求方式都可以对应的到
    http.METHODS.forEach((v) => {
        let method = v.toLocaleLowerCase();
        app[method] = function(path,handle){
            let params = [];
            if(path.includes(':')){
                // 判断是不是路由参数
                path = path.replace(/:([^\/]*)/g,function(){
                    params.push(arguments[1]);
                    return '([^\/]*)';
                });
                path = new RegExp(path);
                // 直接给path对象挂载一个属性方便直接判断和使用
                path.params = params;
            }
            routes.push({
                path,
                method,
                handle,
            })
        }
    })

    app.use = function(path,handle){
        if(typeof path !== 'string'){
            handle = path;
            routes.push({
                path: '/',
                method: 'use',
                handle,
            })
        }else{
            routes.push({
                path,
                method: 'use',
                handle,
            })
        }
    }


    app.listen = function(){
        let server = http.createServer(app);
        server.listen(...arguments);
    }

    return app;
}

module.exports = application;