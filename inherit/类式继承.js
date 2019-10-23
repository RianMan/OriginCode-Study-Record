// 类式继承
function SuperClass(id){
    this.books = ['js','python','php'];
    this.id = id;
}

SuperClass.prototype.showBooks = function(){
    console.log(this.books)
};

function SubClass(id){
    this.id = id;
    this.name = 'Subclass';
}

// new
SubClass.prototype = new SuperClass();


const sub = new SubClass(1);
/**
 * sub ： 是Subclass 的实例 ；就是一个对象吧
 * __proto__属性也是对象才拥有的，属性都是由一个对象指向一个对象，他的作用就是访问对象属性没有的时候去父类上去找
 * prototype对象 是函数所独有的,任何函数一创建就有了，从一个函数指向一个对象
 * constructor属性也是对象才拥有的，一个对象指向一个函数
 */
console.log(sub.__proto__.constructor)
sub.books[1] = 'java'
console.log(sub.id,sub.name,sub.books);
sub.showBooks();
