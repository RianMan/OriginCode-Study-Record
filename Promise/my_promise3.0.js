// promise 3.0  版本; 基本和原生的差不太多;
function MyPromise(task) {
    let that = this;
    that.status = 'pending';
    that.value = undefined;
    that.reason = undefined;
    that.fulfilledCb = [];
    that.rejectedCb = [];
    that.resolve = (value) => {
        if (that.status === 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            that.fulfilledCb.forEach((ele) => {
                ele(value);
            })
        }
    }
    that.reject = (reason) => {
        if (that.status === 'pending') {
            that.status = 'rejected';
            that.reason = reason;
            that.rejectedCb.forEach((ele) => {
                ele(reason);
            })
        }
    }
    try {
        task(that.resolve, that.reject);
    } catch (error) {
        that.reject(error)
    }
}


let resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        throw new Error("循环应用");
    }
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        let then = x.then;
        if (typeof then === 'function') {
            then.call(x, (y) => {
                resolvePromise(promise2, y, resolve, reject);
            }, (e) => {
                reject(e)
            })
        } else {
            resolve(x);
        }
    } else {
        resolve(x)
    }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
    let that = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;
    let promise2;
    if (that.status === 'fulfilled') {
        promise2 = new MyPromise((resolve, reject) => {
            try {
                x = onFulfilled(that.value);
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        })
    }
    if (that.status === 'rejected') {
        promise2 = new MyPromise((resolve, reject) => {
            try {
                x = onRejected(that.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        })
    }
    if (that.status === 'pending') {
        promise2 = new MyPromise((resolve, reject) => {
            that.fulfilledCb.push((value) => {
                try {
                    x = onFulfilled(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
            that.rejectedCb.push((reason) => {
                try {
                    x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (error) {
                    reject(error);
                }
            });
        })
    }
    return promise2;
}



// promise的 all 方法
MyPromise.all = (promiseArr) => {
    if(!Array.isArray(promiseArr)) return new TypeError("请传入一个数组");
    return new MyPromise((res,rej) => {
        try {
            let arr = [];
            let count = 0;
            // 这个函数就可以产生最后一个数组，值是一一对应的
            function cache(index, data){
                arr[index] = data;
                if(++count === promiseArr.length){
                    res(arr);
                }
            };
            promiseArr.forEach((item,index)=>{
                item.then((data)=>{
                    cache(index, data);
                },rej)
            })
        } catch (error) {
            rej(error);
        }
    })
}

// promise.race方法
MyPromise.race = (promiseArr) => {
    if(!Array.isArray(promiseArr)) return new TypeError("请传入一个数组");
    return new MyPromise((resolve, reject)=>{
        promiseArr.forEach((item)=>{
            item.then(resolve,reject);
        })
    })    
}

module.exports = MyPromise;