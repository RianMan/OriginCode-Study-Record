const  fs = require('fs');

const MyReadStream = require('./ReadStream');


let rs = new MyReadStream('./1.txt',{
    flags:'r',
    mode:438,
    start:0,
    end: 3,
    highWaterMark: 3,
})

let arr = [];

rs.on('open',()=>{
    console.log('文件打开了')
})

rs.on('data', (chunk) => {
    console.log(`接收到 ${chunk.length} 字节的数据`);
    rs.pause();
    console.log('暂停一秒');
    setTimeout(() => {
        console.log('数据重新开始流动');
        rs.resume();
    }, 1000);
});


rs.on('end',()=>{
    console.log('读完了');
    console.log(Buffer.concat(arr).toString())
})