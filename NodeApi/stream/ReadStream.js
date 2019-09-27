const EventEmitter = require('events');
const fs = require('fs');


class ReadStream extends EventEmitter{
    constructor(path,options){
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.mode = options.mode || 438;
        this.start = options.start || 0;
        this.end = options.end || 0;
        this.highWaterMark = options.highWaterMark || 1024 * 64;
        this.offset = 0;
        this.following =true;
        this.open();
    }

    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            this.emit('open');
            this.fd = fd;
            this.read();
        })
    }

    read(){
        const next = () =>{
            const buff = Buffer.alloc(this.highWaterMark);
            if(this.following){
                fs.read(this.fd,buff,this.offset,this.highWaterMark, this.start, (err,bytesRead,buffs)=>{
                    if(bytesRead <= 0) {
                        fs.close(this.fd,()=>{});
                        this.following  = false;
                        this.emit('end');
                        return  
                    }
                    this.start += bytesRead;
                    this.emit('data',buffs);
                    next()
                })
            }
        }
        next();
    }

    pause(){
        this.following = false;
    }

    resume(){
        this.following = true;
        this.following && this.read();
    }

    close(){

    }

}

module.exports = ReadStream;