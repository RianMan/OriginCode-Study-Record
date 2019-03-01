const MyPromise = require('./my_promise3.0');

const fn1 = new MyPromise((res,rej)=>{
    let num = Math.random().toFixed(1);
    setTimeout(()=>{
        if(num > .5){
            res("success  " + num);
        }else{
            rej("failed  " + num);
        }
    },1000)
})

const fn2 = new MyPromise((res,rej)=>{
    let num = Math.random().toFixed(1);
    setTimeout(()=>{
        if(num > .5){
            res("success  " + num);
        }else{
            rej("failed  " + num);
        }
    },1000)
})

const fn3 = new MyPromise((res,rej)=>{
    let num = Math.random().toFixed(1);
    setTimeout(()=>{
        if(num > .3){
            res("success  " + num);
        }else{
            rej("failed  " + num);
        }
    },1000)
})

// Promise.all([fn1, fn2, fn3]).then((d)=>{
//     console.log(d);
// }).catch((e)=>{
//     console.log(e);
// });

// MyPromise.all([fn1, fn2, fn3]).then((a) => {
//     console.log(a)
// },(a)=>{
//     console.log(a);
// })

// Promise.race([fn1,fn2]).then((a)=>{
//     console.log(a)
// },(e)=>{
//     console.log(e)
// })

MyPromise.race([fn1,fn2]).then((a)=>{
    console.log(a)
},(e)=>{
    console.log(e)
})