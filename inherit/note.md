## js继承

1. 类式继承
>> 缺点： 1. 当夫有引用类型的时候子修改了会影响夫 2.无法向父类进行传参数

2. 构造函数继承
>> 优点： 可以继承父类this上的属性，并且不影响父类
>> 缺点： 无法继承父类prototype上面的方法的属性

3. 组合继承
>> 把 1，2的优点都结合在一起，然后解决了刚刚的缺点和问题
>> 缺点： 在内部call的时候执行了一遍父类的构造函数，然后做类式继承的时候又做了一遍，很浪费

4. 原型式继承
>> 对类式继承进行了封装
```
function inherit(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```

5. 寄生组合式继承
>> 解决了组合继承的问题
```
function creatObject(sub,supper){
    const p = new inherit(supper);
    p.constructor = sub;
    sub.prototype = p;
}
```