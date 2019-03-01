let MyPromise = require('./my_promise2.0');

let syncFn = new MyPromise((resolve,reject)=>{
    // 这两个参数就是task里面的两个参数
    // 并且是构造函数上面resolve 和 reject的方法
    // resolve('我是同步，并且成功了');
    reject('我是同步，并且失败了');
})

/**
 * 这参数then方法的onFulfilled和onRejected
 */
// syncFn.then((data)=>{
//     console.log("成功： " + data);
// },(reason)=>{
//     console.log("错误：  "+ reason);
// });


// -----------------同步测试OK，来测试一下异步-----------

let asyncFn = new MyPromise((resolve,reject)=>{
    let num = Math.random().toFixed(1);
    setTimeout(()=>{
        if(num < .7){
            resolve("我是成功态： " + num);
        }else{
            reject("我是失败态： " + num);
        }
    },1000)
})
/**
 * 这参数then方法的onFulfilled和onRejected
 */
let k = asyncFn.then((data)=>{
    console.log(data);
    return 'i am success';
},(reason)=>{
    console.log(reason);
    return "you are failed";
});
k.then((d)=>{
    console.log(d)
},(e)=>{
    console.log(e)
});

// 我们在这里基本实现了一个promise了，但是我们现在还做不到then的链式调用
// 所以现在去实现then的链式调用；
// let a = syncFn.then((data)=>{
//     console.log(data);
// },(err)=>{
//     console.log(err);
//     return "12312"
// });
// a.then((data)=>{
//     console.log(data + '---==');
// })