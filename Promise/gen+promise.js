// 用promise和genrator解决异步回调地狱且不能串行的痛点 
let MyPromise = require('./my_promise3.0');
let fs = require('fs');
// 神库
let co = require('co');
// 这是传统的一个异步回调，明显非常的差
// fs.readFile('./1.json','utf8',(err,data)=>{
//     if(!err){
//         console.log(data);
//         fs.readFile('./2.txt','utf8',(err,data)=>{
//             console.log(data);
//         })
//     }
// })
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
// 算然没有回调地狱，但是写的还不是串行；
// readFile('./1.json')
// .then((data)=>{
//     console.log(data);
//     return readFile('./2.txt');
// })
// .then((data) => {
//     console.log(data);
// });

// function* read() {
//     let a = yield readFile('./1.json');
//     console.log(a);
//     let b = yield readFile('./2.txt');
//     console.log(b);
//     return b;
// }

// 执行一下就可以看到效果了，和之前写的一摸一样
// co 函数接受一个genrator函数，然后自动打印出结果;
// co(read).then((a) => { console.log(a) });

// 自己实现了
// function myCo(fn) {
//     return new Promise((resolve, reject) => {
//         function next(d) {
//             try {
//                 let { value, done } = fn.next(d);
//                 if (!done) {
//                     value.then((data)=>{
//                         next(data);
//                     },reject)
//                 }else{
//                     resolve(value); 
//                 }
//             } catch (error) {
//                 reject(error)
//             }
//         }
//         next();
//     })
// }
// myCo(read()).then((a) => {
//     console.log(a)
// });

// ---------------------async await 来解决
// await后面必须接一个promise对象
async function read(){
    let r1 = await readFile('1.json');
    console.log(r1);
    let r2 = await readFile('2.txt');
    console.log(r2 + 111)
}
read();


