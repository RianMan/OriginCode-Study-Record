## redux-saga
1. 解决redux异步留的场景，比redux-thunk更好维护，

2. 使用流程

- 首先注册一个sagaMiddleware
- 然后在产生完store之后调用run方法
- 然后写一个rootsaga的函数
