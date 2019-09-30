## express 框架的实现

1. express 是一款node http服务的一个框架；

2. express 源码的大概实现思路

- 首先他有一个application，由于当时class的写法没有流行，使得express都是通过构造函数的方式去写的，后来TJ才使用class 和 aysnc + await封装了KOA，express比Koa的实现思路更复杂，代码也更多，主要是express的路由系统太复杂了，首先理清楚express的lib文件里面每个文件是干嘛的，这样才能更好的去理解

3. express的文件

- express.js 函数导出一个 =>> 引入 createApllication =>> app

- application =>> 返回一个构造函数， 这里面导出一个get 和 listen方法（暂且不考虑其他的请求方式）

- router 文件夹里面包含了三个文件， 
    1. index.js : 产生一个Router的构造函数，
    >>> 首先它是一个栈型结构，也就是一个数组，在index.js里面有几个方法，首先一个route方法
    2. layer.js: 产生一个Layer的构造函数，
    >>> layer 是对于刚刚index.js里面的数组里面的一层，因为我们每get一次，其实就产生了一层，然后这个layer里面就包含了路径，和请求方法，和handle，<b>然后这个handle其实是route.js里面的一个dispatch方法</b>
    3. Route.js: 产生一个Route的构造函数，
    >>> route.js是最底层的方法，也是最后执行真正用户在使用app.get里面传入的回调函数的handle，在route.js里面又是由一个个layer组成的，因为在get方法里面我们可以传n个handle回调函数，所以他也也是由一层层layer拼出来，但是这里面的layout并没有路径，因为我们在index.js的hanle_request里面已经匹配路径了，匹配不到就不会走到这一层里面来，然后通过route的get方法，把这一层的layer的method置为get，那么我们只要在route.js里面先匹配方法，方法一样那么ok，就去执行真正的handle，handle全部执行完毕以后，通过next再走到下一个layer中去，这是整个express设计中最巧妙的地方，也是最有意思的地方。

- 未完待续。。。
