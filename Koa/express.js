// const express = require('./myexpress/express');
const express = require('express');
const app = express();

app.use((req,res,next)=>{
    next();
    console.log('999')
})

app.get('/user',(req,res,next)=>{
    console.log(111)
    res.end('hello express')
})

app.listen(9001)