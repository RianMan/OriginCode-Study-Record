let Koa = require('./mykoa/koa');
let app = new Koa();
app.use(async function(ctx, next){
    console.log(1);
    next();
    console.log(2);
})

app.use(async function(ctx, next){
    console.log(3);
    next();
    console.log(4);
})

app.use(async function(ctx, next){
    console.log(5);
    ctx.res.end('ok');
})

app.listen(9000)