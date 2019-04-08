let express = require('express');
let app = express();

app.get('/home',(req,res)=>{
    res.end('home')
});

app.listen(9000,()=>{
    console.log('localhost:9000');
})