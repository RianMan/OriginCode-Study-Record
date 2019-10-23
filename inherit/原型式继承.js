function inherit(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function SuperClass(id){
    this.books = ['js','python','php'];
    this.id = id;
}

SuperClass.prototype.showBooks = function(){
    console.log(this.books)
};


const sub1 = inherit(new SuperClass());
const sub2 = inherit(new SuperClass());
sub1.books[1] = 'java'
console.log(sub1.books);
console.log(sub2.books);
sub1.showBooks()
sub2.showBooks()

