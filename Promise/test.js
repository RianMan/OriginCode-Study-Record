const MyPromise = require('./my_promise');
const MyPromise2 = require('./my_promise2.0');

/**
 * 系统自带的promise
 */
// let fn = new Promise((resolve,reject)=>{
//     const randomNum = Math.random().toFixed(1);
//     setTimeout(() => {
//         if(.1 < .5){
//             resolve('i am success');
//         }else{
//             reject('i am failed')
//         }
//     }, 1000);
// });
// fn.then((data)=>{
//     console.log(data);
//     const fn = () => {console.log("cbcb")}
//     return fn;
// },(reason) => {
//     console.log(reason);
// }).then((a)=>{
//     console.log(a());
// });

/**
 * 自己写的的promise
 */
// let fn_my = new MyPromise((resolve,reject)=>{
//     const randomNum = Math.random().toFixed(1);
//     setTimeout(() => {
//         console.log(randomNum);
//         if(randomNum < .5){
//             resolve('i am success');
//         }else{
//             reject('i am failed')
//         }
//     }, 1000);
// });
// fn_my.then((data)=>{
//     console.log(data);
// },(reason) => {
//     console.log(reason);
// })



/**
 * 自己写的的promise,支持then链调用
 */
let fn_my = new MyPromise2((resolve,reject)=>{
    setTimeout(()=>{
        resolve(100)
    },1000)
});
fn_my.then((res)=>{
    console.log("第一次的结果" + res);
    let fn = new MyPromise2((res,rej) => {
        res("1000")
    })
    return fn;
},(err)=>{
    console.log(err);
    return 'heihei'
}).then((res) => {
    console.log(typeof fn);
})

