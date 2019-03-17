// 递归删除非空目录
let fs = require('fs');
let path = require('path');
// fs.mkdir 创建空目录
// fs.rmdir 删除空文件夹
// fs.unlink 删除w文件
// fs.rmdir('./b',(err)=>{
//     console.log(err)
// });
// fs.unlink
// fs.stat('./a',(err,stats)=>{
//     // console.log(stats);
//     let a = stats.isDirectory();
//     console.log(a)
// });
// fs.readdir('./a',(e,f)=>{
//     console.log(f);
// })
// fs.mkdir('./a/1.txt',(e)=>{
//     console.log(e)
// });

function delDir(root,callback) {
    // 1.读取根目录下面的子目录，数组 files
    fs.readdir(root, (err, files) => {
        // 2.定义next方法为了循环递归目录
        function next(index){
            if(index >= files.length){
                // 4.当发现根目录的长度和索引一样长时结束递归
                return fs.rmdir(root,callback);
            }
            // 3.获取到路径
            let newPath = path.join(root,files[index]);
            fs.stat(newPath,(err,stats)=>{
                //判断这个是目录还是文件夹
                if(stats.isDirectory()){
                    delDir(newPath,()=>next(index+1))
                }else{
                    fs.unlink(newPath,(e)=>{
                        if(e) throw e;
                        next(index+1)
                    });
                }
            })
        }
        next(0);
    })
}
// delDir('./a.2',()=>{
//     console.log('success')
// });

// 深度优先遍历目录 
function widthFile(root,callback){
    fs.readdir(root,(err,paths)=>{
        function next(index){
            if(index >= paths.length) return callback();
            let child = path.join(root,paths[index]);
            console.log(child);
            fs.stat(child,(e,stats)=>{
                if(stats.isDirectory()){
                    widthFile(child,()=>next(index + 1)); 
                }else{
                    next(index + 1);
                }
            })
        }
        next(0);
    })
}
widthFile('a.4',()=>{console.log('全部打印完毕')});