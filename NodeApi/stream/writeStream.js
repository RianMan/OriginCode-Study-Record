const EventEmitter = require('events');
const fs = require('fs');

class WriteStream extends EventEmitter{
    constructor(path,options){
        // 默认配置项
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.flags = options.flags || 'w';
        this.encoding = options.encoding || 'utf8';
        this.mode = options.mode || 438;
        this.start = options.start || 0;

        // 读取数据的长度
        this.len = 0;
        // 缓存区
        this.cache = [];
        // 读取的偏移量
        this.offset = 0;
        // 是否正在读取文件
        this.writing = false;
        // 默认会触发一个打开文件的操作
        this.open();
    }

    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            this.fd = fd;
            // 触发文件的打开事件
            this.emit('open',this.fd)
        });
    }

    // 外部读取的写的方法
    write(chunk,encoding=this.encoding ,callback){
        // 写入必须是个buffer或者字符串
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        this.len += chunk.length;
        // 标志这还能不能继续往内存里写
        let flag = this.len < this.highWaterMark;
        // 如果正在写 就先放在缓存区
        if(this.writing){
            this.cache.push({
                chunk,
                encoding,
                callback
            })
        }else{
            this.writing = true;
            // 调用真正文件写的操作，并且传入清除缓存的操作
            this._write(chunk,encoding,()=>{
                callback && callback();
                this.clearCache();
            })
        }
        
       return flag;
    }

    clearCache(){
        // 出栈
        let one = this.cache.shift();
        if(one){
            // 再次调用写的操作
            this._write(one.chunk,one.encoding,()=>{
                this.clearCache();
            })
        }else{
            // 缓存区为空以后触发drian事件，
            this.writing = false;
            this.emit('drain')
        }
    }

    _write(chunk,encoding ,callback ){
        // 因为由于代码是同步执行，所以这这里面拿不到this.fd就不能进行文件的写的操作
        // 所以必须通过触发open事件后在进行写的操作
        // 通过发布订阅解决了回调嵌套的问题
        if(typeof this.fd !== 'number'){
            return this.once('open',()=>{
                this._write(chunk,encoding,callback)
            })
        }
        fs.write(this.fd,chunk,0,chunk.length,this.offset,(err,bW)=>{
            // 写完以后偏移量发生改变
            this.offset += bW;
            // 写完以后长度真正在内存的长度减少
            this.len -= bW;
            callback();
        })
    }

}

module.exports = WriteStream;