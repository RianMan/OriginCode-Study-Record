let express = require('./myexpress');
// let express = require('express');
let app = express();

// 中间价的作用：
//     1.我们可以做一些权限校验
//     2.配置一些公共的方法和公共属性
//     3.如果不调用next方法，则不会继续向下执行，是否可以继续执行后续逻辑
//     4.一般中间价在路由之前
app.use(function(req,res,next){
    req.a = 222;
    next();
})

app.get('/home/:id/:name',(req,res)=>{
    console.log(req.a);
    res.end('111');
}); 

app.get('/user',(req,res)=>{
    console.log(22);
    res.end('home， post')
}); 

app.get('/login',(req,res)=>{
    console.log(33);
    res.end('home， put')
}); 


app.listen(9000,()=>{
    console.log('localhost:9000');
})