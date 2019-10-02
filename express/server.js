const express = require('./express');

const app = express();

app.use('/home',(req,res,next)=>{
    console.log('i am middleware')
    next();
})


app.get('/',(req,res,next)=>{
    console.log('1');
    next();
},(req,res,next)=>{
    console.log('11');
    res.end('hello')
    next();
});


app.get('/home',(req,res,next)=>{
    res.end('hello world');
})

app.post('/home',(req,res,next)=>{
    res.end('hello world post');
})

app.listen(9000);
