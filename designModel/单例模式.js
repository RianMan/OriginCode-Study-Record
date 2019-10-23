/**
 * 概念：只允许实例化一次的对象类，一个对像规划一个命名空间，典型的用例就是jq
 */

const LazySingle = (function(){
    let _instance = null;
    function Single(){
        //定义私有属性和方法
        return {
            publicMethod: function(){},
            publicPeoperty: '1.0'
        }
    }
    // 获取单例的接口
    return function(){
        if(!_instance){
            _instance = Single();
        }
        return _instance;
    }
})()

console.log(LazySingle().publicPeoperty)