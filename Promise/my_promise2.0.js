function MyPromise(task) {
    let that = this;
    // 状态（pending，fulfilled， rejected）;
    that.status = 'pending';
    // 成功后的值
    that.value = undefined;
    // 失败的原因
    that.reason = undefined;
    // 成功的回调函数
    that.fulfilledCb = [];
    // 失败的回调函数
    that.rejectedCb = [];
    // 处理成功态的函数
    that.resolve = (value) => {
        // promiseA+的标准就是必须从pending态到成功态
        if (that.status === 'pending') {
            that.status = 'fulfilled';
            that.value = value;
            // 处理异步情况的;因为异步的时候状态处在pending态
            // 类似于一个发布订阅的关系
            that.fulfilledCb.forEach((ele) => {
                ele(value);
            })
        }
    }
    // 处理失败态的函数
    that.reject = (reason) => {
        if (that.status === 'pending') {
            that.status = 'rejected';
            that.reason = reason;
            that.rejectedCb.forEach((ele) => {
                ele(reason);
            })
        }
    }
    // promise对象传来之后的回调函数（task）执行
    // 处理了错误情况
    try {
        task(that.resolve, that.reject);
    } catch (error) {
        that.reject(error)
    }
}
// 2.2.7 必须有一个resolvePromise函数来then处理返回的结果
/**
 * promise2: 我觉得是为了判断x 和 promise2是不是同一个（个人理解）;
 * x: then回调函数返回的结果;
 * resolve, reject:  promise类自带的方法
 *  */
let resolvePromise = (promise2, x, resolve, reject) => {
    if (x === promise2) {
        throw new Error("循环应用");
    }
    // 只要满足这个条件就认为这是一个promise对象
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        let then = x.then;
        // 如果返回的x含有这个then，那么我们就认为他是一个promise，继续递归直到他是一个普通值
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

// promise的then方法（核型）
/**
 * 这两个参数遵循的promiseA+的规范
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
    let that = this;
    // 2.2.1 如果参数不是一个函数那么需要给它一个默认值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;
    // 2.2.7 then 必须返回一个promise ,支持then的链式调用
    let promise2;
    if (that.status === 'fulfilled') {
        promise2 = new MyPromise((resolve, reject) => {
            // 这个函数就是我们通常在then方法之后写的第一个回调函数
            try {
                x = onFulfilled(that.value);
                // resolve(x); 这个只能处理普通的返回值，但是返回一个promise就无法解决了
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        })
    }
    if (that.status === 'rejected') {
        // 这个函数就是我们通常在then方法之后写的第二个回调函数
        promise2 = new MyPromise((resolve, reject) => {
            // 这个函数就是我们通常在then方法之后写的第一个回调函数
            try {
                x = onRejected(that.reason);
                // resolve(x); 这个只能处理普通的返回值，但是返回一个promise就无法解决了
                // 所以需要一个强化版resolve存在
                resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
                reject(error);
            }
        })
    }
    if (that.status === 'pending') {
        // 这个是我们处理异步调用的时候所要做的处理
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

module.exports = MyPromise;