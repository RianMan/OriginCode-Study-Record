const http = require('http');
const url = require('url');

function express(){
    let app = {
        route:[],
    }

    // 渲染添加请求格式给express的app实例
    http.METHODS.forEach((M)=>{
        let m = M.toLocaleLowerCase();
        app[m] = function(path,fn){
            let obj = {
                path,
                fn,
                method: m,
            }
            app.route.push(obj);
        }
    });

    app.use = function(path,fn){
        let obj = {method:'use'}
        if(typeof path !== 'string'){
            obj.path = '/';
            obj.fn = path;
        }else{
            obj.path = path;
            obj.fn = fn;
        }
        app.route.push(obj);
    }


    app.listen = function (){
        const server = http.createServer((request,response)=>{
            let routeArr = this.route;
            let reqUrl = url.parse(request.url).pathname;
            let reqMethod = request.method.toLocaleLowerCase();
            let index = 0;
            function next(i){
                
                if(i >= routeArr.length) return;
                let route = routeArr[i];
                if(route.method === 'use' && (route.path === reqUrl || route.path==='/')){
                    route.fn(request,response,() => next(i+1));
                }else{
                    if(route.path === reqUrl && route.method === reqMethod){
                        route.fn(request,response, () => next(i+1));
                        return;
                    }
                    next(index+1)
                }
            }
            next(index);
            // 无中间件的处理方式
            // this.route.forEach((v)=>{
            //     if(v.path === reqUrl && v.method === reqMethod){
            //         v.fn(request,response);
            //         return;
            //     }
            // });
            response.end('not found');
        });
        server.listen(...arguments);
    }

    return app;
}

module.exports = express;