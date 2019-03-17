let fs = require('fs');
// 获取文件的子目录
fs.readdir('./a',(err,files)=>{
    console.log(files);
});