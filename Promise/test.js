const MyPromise = require('./my_promise');

/**
 * 系统自带的promise
 */
let fn = new Promise((resolve,reject)=>{
    const randomNum = Math.random().toFixed(1);
    setTimeout(() => {
        console.log(randomNum);
        if(randomNum < .5){
            resolve('i am success');
        }else{
            reject('i am failed')
        }
    }, 1000);
});
fn.then((data)=>{
    console.log(data);
},(reason) => {
    console.log(reason);
})

/**
 * 自己写的的promise
 */
let fn_my = new MyPromise((resolve,reject)=>{
    const randomNum = Math.random().toFixed(1);
    setTimeout(() => {
        console.log(randomNum);
        if(randomNum < .5){
            resolve('i am success');
        }else{
            reject('i am failed')
        }
    }, 1000);
});
fn_my.then((data)=>{
    console.log(data);
},(reason) => {
    console.log(reason);
})


