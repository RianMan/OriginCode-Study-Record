const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');


app.use(
    route.get('/user',(ctx,next)=>{
    ctx.body = 'hello koa-route'
}));

app.use(route.get('/list',(ctx) => {
    ctx.body = 'hello list'
}))

app.listen(9000)