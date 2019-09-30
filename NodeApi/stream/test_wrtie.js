const  fs = require('fs');
// const rs = fs.createReadStream('./1.txt');
const MyWriteStream = require('./writeStream');
const ws = new MyWriteStream('./copy.txt',{
    highWaterMark: 3,
})
// const ws = fs.createWriteStream('./copy.txt',{
//     highWaterMark: 3,
// });

let count = 0;

function write(){
    let flag = true;
    console.log(count);
    while( count < 10 && flag){
        flag = ws.write(count + '');
        count += 1;
        // console.log(flag,'flag')
    }
}
write()
ws.on('drain', ()=>{
    write()
})

