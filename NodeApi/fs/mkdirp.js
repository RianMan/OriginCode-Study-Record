let fs = require('fs');
// 递归创建目录
function mkdirp(path){
    let pathArr = path.split('/');
    let len = pathArr.length;
    !function next(index){
        if(index > len) return;
        let fir = pathArr.slice(0,index).join('/');
        fs.mkdir(fir,(err)=>{
            if(!err){
                next(index + 1);
            }
        })
    }(1);
}

mkdirp('a/b/c');
// fs.mkdir('a/b/c',(err)=>{
//     console.log(err)
// });