const express = require('./express');

const app = express();

app.get('/',(req,res,next)=>{
    console.log('/');
    next();
});

app.get('/home',(req,res,next)=>{
    res.end('hello world');
})

app.listen(9000);
