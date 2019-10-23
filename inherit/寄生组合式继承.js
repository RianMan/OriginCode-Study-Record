function inherit(o){
    function F(){}
    F.prototype = o;
    return new F();
}

function inheritObject(subClass,superClass){
    const p = inherit(superClass);
    p.constructor = subClass;
    subClass.prototype = p;
}

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

inheritObject(SubClass,SuperClass)

const sub1 =  new SuperClass(1);
const sub2 =  new SuperClass(2);
sub1.books[1] = 'java'

sub1.showBooks()
sub2.showBooks()

