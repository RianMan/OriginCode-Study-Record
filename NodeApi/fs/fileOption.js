// const fs = require('fs');
const path = require('path');
const { stat,unlink,readdir, rmdir} = require('fs').promises;
// const { access , mkdir } = require('fs').promises;

// 循环创建文件夹
function my_mkdir(fileStr){
    let fileArr = fileStr.split('/');
    let index = 0;
    function next(){
        if(index === fileArr.length) return;
        let currentArr = fileArr.slice(0, ++index);
        let str = currentArr.join('/');
        // 判断文件有没有
        fs.access(str,(err)=>{
            if(err){
                fs.mkdir(str,(err)=>{
                    if(err) return;
                    next();
                })
            }else{
                next()
            }
        })
    }
    next();
}

// my_mkdir('a/b');

// 先序深度 串联  递归删除文件
/**
 * a 下面有b c ，b下面有d
 * 顺序是b > d > c,
 */
function preSeriesDelDir(dir,callback=()=>{}){
    fs.stat(dir,(err,fileObj)=>{
        if(fileObj.isFile()){
            fs.unlink(dir,callback);
        }else{
            fs.readdir(dir,(err,files)=>{
                files = files.map(f => path.join(dir,f));
                let index = 0;
                function next(){
                    if(index === files.length){
                        return fs.rmdir(dir,callback);
                    }
                    let current = files[index++];
                    preSeriesDelDir(current,next)
                }
                next();
            })
        }
    })
}
// preSeriesDelDir('k');

// 先序深度 并联
/**
 * a 下面有b c ，b下面有d
 * 顺序是b c同时开始结束就全部结束
 */
function parallDeleteDir(dir,callback=()=>{}){
    fs.stat(dir,(err,fileObj)=>{
        if(fileObj.isFile()){
            fs.unlink(fileObj,callback);
        }else{
            fs.readdir(dir,(err,files)=>{
                files = files.map(f => path.join(dir,f));
                if(files.length === 0){
                    fs.rmdir(dir,callback)
                }
                let index = 0;
                function done(){
                    if(++index === files.length){
                        return fs.rmdir(dir,callback)
                    }
                }
                files.forEach(f=>{
                    parallDeleteDir(f,done)
                })
            })
        }
    })
}
// parallDeleteDir('aa');

// 先序深度 promise 版
function promiseDelDir(dir){
    return new Promise((resolve,reject)=>{
        fs.stat(dir,(err,fileObj)=>{
            if(err) return reject(err);
            if(fileObj.isFile()){
                fs.unlink(dir,resolve)
            }else{
                fs.readdir(dir,(err,files)=>{
                    files = files.map(f => path.join(dir,f));
                    filesPromise = files.map(f => promiseDelDir(f));
                    Promise.all(filesPromise).then(()=>{
                        fs.rmdir(dir,resolve);
                    });
                })
            }
        })
    })
}
// promiseDelDir('a');
// 先序深度 async await 版
// console.log(fs.promises)
async function awaitDelDir(dir){
    let fileObj = await stat(dir);
    if(fileObj.isFile()){
        unlink(dir);
    }else{
        let files = await readdir(dir);
        let promiseArr = files.map(f => awaitDelDir(path.join(dir,f)))
        await Promise.all(promiseArr);
        await rmdir(dir);
    }
}
awaitDelDir('a');