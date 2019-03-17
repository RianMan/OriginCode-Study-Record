var fs = require('fs');

fs.readFile('./1.txt','utf-8',(err, data) => {
		console.log(data);
})

// fs.open('./1.txt','r',0o666,(err,fd)=>{
// 	// console.log(fd.toString());
// 	let buffer = Buffer.alloc(3);
// 	fs.read(fd,buffer,0,3,3,(err,b,buff)=>{
// 		console.log(buffer)
// 		console.log(buffer.toString());
// 	})
// })