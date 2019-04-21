let koa = require('koa');
const app = new koa();


app.use(async function(ctx,next){
    if(ctx.url ==='/user' && ctx.method === 'GET'){
        ctx.set('Content-Type','text/html;charset=utf-8');
        ctx.body = `
            <form action='/user' method='post'>
                <input type='text' name='username' />
                <input type='submit' value='提交'>
            </form>
        `;
    }else{
        await next()
    }
});

function getResult(ctx){
    return new Promise((resolve,reject) => {
        let buf = [];
        ctx.req.on('data',function(data){
            buf.push(data);
        });
        ctx.req.on('end',function(){
            let a = Buffer.concat(buf);
            resolve(a.toString());
        })
    })
}

app.use(async function(ctx,next){
    if(ctx.url ==='/user' && ctx.method === 'POST'){
       ctx.body = await getResult(ctx);
    }else{
        await next()
    }
});

app.listen(9000)