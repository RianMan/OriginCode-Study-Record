const  fs = require('fs');
const rs = fs.createReadStream('./1.txt');
const ws = fs.createWriteStream('./copy.txt',{
    highWaterMark: 3,
});

// rs.on('data',(data)=>{
//     ws.write(data)
// })
let count = 10;
while(count--){
    ws.write(count + '')
}
ws.on('drain',(flag)=>{
    console.log(flag);
})

ws.end(()=>{
    console.log('end')
})
