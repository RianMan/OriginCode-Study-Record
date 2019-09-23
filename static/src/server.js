import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';
import mime from 'mime';
import ejs from 'ejs';


const { stat,readdir, readFile } = fs.promises;
const tplPath = path.join(__dirname,'../index.ejs')


class HttpServer{
    constructor(config = {}){
        this.port = config.port || 8888;
        this.server = http.createServer(this.handleRequet.bind(this));
    }

    async handleRequet(req,res){
        const { pathname } = url.parse(req.url);
        const filePath = path.join(process.cwd(),pathname);
        try {
            const fileObj = await stat(filePath);
            if(fileObj.isDirectory()){
                let dirs = await readdir(filePath);
                dirs = dirs.map(d => pathname + d);
                try {
                    let str = await ejs.renderFile(tplPath, {dirs});
                    res.end(str);
                } catch (error) {
                    this.sendError(req,res)
                }
               
            }else{
                try {
                    console.log(filePath,'filePath');
                    const data = await readFile(filePath,'utf8');
                    const name = mime.getType(filePath);
                    res.setHeader('Content-Type', name +";charset=utf-8");
                    res.end(data);
                } catch (error) {
                    this.sendError(req,res)
                }
               
            }
        } catch (error) {
            console.log(error);
            this.sendError(req,res)
        }
    }

    readTemp(data){
    }

    sendError(req,res){
        res.statusCode = 404;
        res.end('not found')
    }

    start(){
        this.server.listen(this.port,()=>{
            console.log(`服务已经启动在: http://localhost:${this.port}`)
        })
    }
}

export default HttpServer;