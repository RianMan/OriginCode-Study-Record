let route = '/user/:id/:name';

let path = '/user/10/zs';

let args = []
let a = route.replace(/:([^\/]*)/g,function(){
    args.push(arguments[1]);
    return '([^\/]*)';
});
let reg = new RegExp(a);
let [,...list] = path.match(reg);
console.log(list);