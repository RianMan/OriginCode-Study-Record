// buffer的常用api,buffer存放内存的地方，叫做缓冲器，二进制的数据
// 1. 生成一个buffer
let buf1 = Buffer.alloc(10);
console.log(buf1);

let buf2 = Buffer.from('shawVi');
console.log(buf2)
// 转出 <Buffer 73 68 61 77 56 69>是一个八进制的表示s 对应的就是73
// 因为s在asccii表中的是115，

// 2. buffer合并
let buf3 = Buffer.from('hello');
let buf4 = Buffer.from('world');
let buf6 = Buffer.from(' ');
let buf5 = Buffer.concat([buf3,buf6,buf4]);
console.log(buf5.toString()); //hello world