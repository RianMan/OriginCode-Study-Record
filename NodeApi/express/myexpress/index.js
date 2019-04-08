let http = require('http');
let url = require('url');
// 返回一个函数，函数返回一个app对象
function application(){
    app = {}

    let routes = [];

    app.get = function(path,handle){
        routes.push({
            path,
            method: 'get',
            handle,
        })
    }

    app.listen = function(){
        let server = http.createServer(function(req,res){
            let { pathname } = url.parse(req.url);
            let methodRequest = req.method.toLocaleLowerCase();
            for (let index = 0; index < routes.length; index++) {
                const element = routes[index];
                if(pathname === element.path && methodRequest===element.method){
                    return element.handle(req,res);
                }
            }
            res.end(`cannot ${methodRequest} ${pathname}`)
            console.log(pathname);
        });
        server.listen(...arguments);
    }

    return app;
}

module.exports = application;