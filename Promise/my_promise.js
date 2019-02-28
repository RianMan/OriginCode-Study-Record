function MyPromise(task) {
    const that = this;

    /** 
     *  promise的状态，
     *  pending， fulfilled(成功态)，rejected（失败态）
     *  */
    that.status = 'pending';

    // 成功的数据
    that.value = null;
    // 失败的理由
    that.reason = null;

    // 执行队列
    that.onFulfilledArr = [];
    that.onRejectedArr = [];

    // 成功态的执行函数
    that.resolve = (value) => {
        if(that.status === 'pending'){
            that.status = 'fulfilled';
            that.value = value;
            that.onFulfilledArr.forEach(item => item(value));
        }
    }

    // 失败态的执行函数
    that.reject = (reason) => {
        if(that.status === 'pending'){
            that.status = 'rejected';
            that.reason = reason;
            that.onRejectedArr.forEach(item => item(reason));
        }
    }

    try {
        task(that.resolve,that.reject)
    } catch (error) {
        that.reject(error);
    }

}

MyPromise.prototype.then = function(onFulfilled,onRejected) {
    if(this.status === 'fulfilled'){
        onFulfilled(this.value);
    }
    if(this.status === 'rejected'){
        onRejected(this.reason);
    }
    if(this.status === 'pending'){
        this.onFulfilledArr.push(onFulfilled);
        this.onRejectedArr.push(onRejected);
    }
}

module.exports = MyPromise;